const fs = require('fs');
const fetch = require('node-fetch');
const {promisify} = require('util');
const htmlparser = require("htmlparser2");

process.on('unhandledRejection', r => console.log(r));

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const randomUUID = () => {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        c => {
            const r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
        });
};


const AllCamps = [];

const extractCampData = gift => {
    const camp = AllCamps.find(c => c.campName === gift.campName )
    if (!camp) {
        const newCamp = {
            campId: randomUUID(),
            campName: gift.campName,
            gifts: [gift.giftId],
        };

        AllCamps.push( newCamp )
    } else {
        camp.gifts.push( gift.giftId )
    }
};

const applyGeneratedCampIds = gifts => {
    AllCamps.forEach( camp => {
        const giftsForCamp = gifts.filter( g => g.campName === camp.campName );
        giftsForCamp.forEach( g => g.campId = camp.campId );
    })
};



const parseGifDateTime = (dateDesc, hourDesc) => {

    const giftDates = [];

    const hour = hourDesc[0];
    const minute = hourDesc[1];

    // todo: handles this: time ==== כל היום

    if (dateDesc === 'פעילות חוזרת (תופיע בכל ששת הימים!)') {

        const midburnStartDate = 14;
        const midburnEndDate = 20;

        for (let day = midburnStartDate; day < midburnEndDate; day++) {
            const date = new Date(2018, 5 - 1, day, hour, minute, 0, 0);
            giftDates.push(date)
        }

    } else {
        const day = dateDesc.split(' ')[1].split('/')[0];

        const date = new Date(2018, 5 - 1, day, hour, minute, 0, 0);
        giftDates.push(date);
    }

    return giftDates;
};


const extractGiftTags = (tags, hearingImpaired, kidsOrAdults) => {

    const extractedTags = [];

    if (hearingImpaired === 'כן') {
        extractedTags.push("HearingImpaired")
    }

    if (kidsOrAdults === 'למבוגרים בלבד - אין כניסה לילדים') {
        extractedTags.push("Adults")
    } else if (kidsOrAdults === 'הפעילות מיועדת בעיקר/גם לילדים') {
        extractedTags.push("Kids")
    }

    if (tags.includes('אוכל') || tags.includes('שתיה')) {
        extractedTags.push("ServesFoodOrDrinks")
    }
    if (tags.includes('אלכוהול')) {
        extractedTags.push("Alcohol")
    }
    if (tags.includes('מסיבה')) {
        extractedTags.push("Party")
    }
    if (tags.includes('פעילות בשפה האנגלית')) {
        extractedTags.push("English")
    }

    if (tags.isElement) {
        extractedTags.push("Other")
    }

    return extractedTags;
};

const extractGiftData = gift => {
    const dateDesc = gift['יום בו מתרחשת הפעילות'];
    const hourDesc = gift['שעה'].split(':');

    const tags = gift[' מה האייקונים המתארים הכי נכון את הפעילות? בחרו עד 3 אייקונים לכל היותר! (שימו לב בחירה של יותר מ-3 אפשרויות תוביל ללקיחת 3 האפשרויות הראשונות שנבחרו) אם אתם מרגישים שאתם חייבים לבחור עוד אייקון - רשמו לנו איזה בהערות למטה'].split(',').map(t => t.trim());
    const hearingImpaired = gift['האם הפעילות מונגשת בשפת הסימנים?'];
    const kidsOrAdults = gift['האם הפעילות מיועדת לילדים או מתאימה למבוגרים בלבד? (אם הפעילות בתחום האפור אל תסמנו כלום)'];

    const giftTags = extractGiftTags(tags, hearingImpaired, kidsOrAdults);

    //https://www.google.co.il/search?q=icon+for+hearing+impaired&num=30&tbm=isch&tbo=u&source=univ&sa=X&ved=0ahUKEwi4sOWV4KDaAhWQzqQKHXBCB98QsAQIJw&biw=1200&bih=1755

    const giftDates = parseGifDateTime(dateDesc, hourDesc);

    return giftDates.map(date => {
        return {
            campId: '',
            giftId: randomUUID(),
            campName: gift['שם המחנה'],
            description: gift['תיאור הפעילות בעברית'],
            descriptionEn: gift['תיאור הפעילות באנגלית'],
            title: gift['תיאור הפעילות בעברית'],
            titleEn: gift['תיאור הפעילות באנגלית'],
            time: date.getTime() / 1000,
            locationName: gift['שם המחנה'],
            tags: giftTags
        }
    });

};

const extractArtData = art => {
  return {
      artId: art['Id'],
      name: art['Name'],
      nameEn: art['En name'],
      title: art['Subtitle'],
      titleEn: art['En subtitle'],
      description: art['Description'],
      artist: art['Contact name'],
      philosophy: art['Dreamprop philosophy'],
  }
};


const downloadArtImages = artId => {
    return fetch(`https://dreams.midburn.org/dreams/${artId}`)
        .then(res => res.text())
        .then(body => {
            const artImageUrls = [];
            return new Promise(function(resolve, reject){
                const parser = new htmlparser.Parser( {
                    onopentag: function(name, attribs) {
                        if (name === 'img') {
                            artImageUrls.push(attribs.src);
                        }
                    },
                    onend: function() {
                        resolve(artImageUrls);
                    }
                });
                parser.write(body);
                parser.end();

            });
        });
};

downloadArtImages(294).then(console.log );


readFile('art.json').then(file => {
    const arts = JSON.parse(file);
    const artsParsed = Object.keys(arts).map((key) => arts[key] );

    const artsProcessed = artsParsed.map(extractArtData);
    const imagesFuture = artsProcessed.map(a => {
        return downloadArtImages(a.artId).then(images => {
            a.imageUrls = images;
            return a;
        } )
    } );

    return Promise.all( imagesFuture )
                  .then( artsWithImageUrls => writeFile('../2018/arts.json', JSON.stringify(artsWithImageUrls, null, '\t')) );
});

readFile('gifts.json').then(file => {
    const gifts = JSON.parse(file);
    const giftsParsed = Object.keys(gifts).map((key) => gifts[key] );

    const giftsProcessed = [].concat.apply([], giftsParsed.map(extractGiftData));

    giftsProcessed.forEach( extractCampData );

    applyGeneratedCampIds( giftsProcessed );


    return writeFile('../2018/camps.json', JSON.stringify(AllCamps, null, '\t'))
        .then( writeFile('../2018/gifts.json', JSON.stringify(giftsProcessed, null, '\t')) );
});

