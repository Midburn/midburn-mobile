const fs = require('fs');
const fse = require('fs-extra');
const fetch = require('node-fetch');
const {promisify} = require('util');
const htmlparser = require("htmlparser2");
const download = require('image-downloader');
const path = require('path');

process.on('unhandledRejection', r => console.log(r));

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const ensureDir = promisify(fse.ensureDir);

const randomUUID = () => {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        c => {
            const r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
        });
};

const applyGeneratedCampIds = (camps, gifts) => {
    camps.forEach( camp => {
        // todo: check that the filter matches !!!
        const giftsForCamp = gifts.filter( g => g.campName === camp.campName );

        if (giftsForCamp.isEmpty) {
            console.log(`cannot find match for ${camp.campName}`)
        }
        giftsForCamp.forEach( g => g.campId = camp.campId );
        camp.gifts = giftsForCamp.map(gift => gift.giftId);
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

const downloadArtImage = async (artId, {name, url}) => {
    await ensureDir(path.resolve(path.join()));
    const file = path.resolve(path.join('..', '2018', 'images', 'arts', artId, name))
    await download.image({
        url: url,
        dest: file,
    });
};

const extractArtData = async art => {
    const artId = art['Id'];
    const imageUrls = await locateArtImages(artId);

    imageUrls.forEach( async artUrl => await downloadArtImage(artId, artUrl) );

    return {
        artId: artId,
        name: art['Name'],
        nameEn: art['En name'],
        title: art['Subtitle'],
        titleEn: art['En subtitle'],
        description: art['Description'],
        artist: art['Contact name'],
        philosophy: art['Dreamprop philosophy'],
        images: imageUrls.map(art => art.name),
    }
};


const locateArtImages = async artId => {
    const res = await fetch(`https://dreams.midburn.org/dreams/${artId}`);
    const body = await res.text();

    const artImageUrls = [];
    let counter = 1;
    return await new Promise(function(resolve, reject){
        const parser = new htmlparser.Parser( {
            onopentag: function(name, attribs) {
                if (name === 'img') {
                    artImageUrls.push({
                        name: `art${counter}.jpg`,
                        url: attribs.src,
                    });
                    counter += 1;
                }
            },
            onend: function() {
                resolve(artImageUrls);
            }
        });
        parser.write(body);
        parser.end();
    });
};

const extractCampTags = (tags, disabledOptions, kidsOrAdults) => {

    const extractedTags = [];



    if (disabledOptions === 'מונגש מוגבלויות לתנועה') {
        extractedTags.push("PhysicallyDisabled")
    }
    if (disabledOptions === 'מונגש למוגבלויות ראיה') {
        extractedTags.push("VisuallyImpaired")
    }
    if (disabledOptions === 'מונגש בשפת הסימנים (מוגבלויות שמיעה)') {
        extractedTags.push("HearingImpaired")
    }


    if (kidsOrAdults === 'הכניסה לקאמפ הינה למבוגרים בלבד (18+)') {
        extractedTags.push("Adults")
    } else if (kidsOrAdults === 'מיועד בעיקר/גם לילדים') {
        extractedTags.push("Kids")
    }
    //
    // if (tags.includes('אוכל') || tags.includes('שתיה')) {
    //     extractedTags.push("ServesFoodOrDrinks")
    // }
    // if (tags.includes('אלכוהול')) {
    //     extractedTags.push("Alcohol")
    // }
    // if (tags.includes('מסיבה')) {
    //     extractedTags.push("Party")
    // }
    // if (tags.includes('פעילות בשפה האנגלית')) {
    //     extractedTags.push("English")
    // }
    //
    // if (tags.isElement) {
    //     extractedTags.push("Other")
    // }

    return extractedTags;
};

const downloadImageForCamp = async (campId, coverUrl) => {
    if ((!coverUrl || /^\s*$/.test(coverUrl))) {
        console.log(`Empty cover url ${coverUrl}`)
        return "";
    }

    await download.image({
        url: `https://www.googleapis.com/drive/v3/files/${googleDriverFileId}?key=${googleApiKey}`,
        // url: `https://googledrive.com/host/${googleDriverFileId}`,
        dest: path.join(__baseDir, 'coverUrl.jpg'),
    });
    return `2018/camps/images/${campId}/coverUrl.jpg`
};


const extractCampsData = camp => {

    const campId = randomUUID();
    const tags = camp['סוג המחנה - בחרו עד 3 אייקונים שמציגים אתכם בצורה הטובה ביותר וממצים את הפעילויות שאתם עושים (שימו לב בחירה של יותר מ-3 אפשרויות תוביל ללקיחת 3 האפשרויות הראשונות שנבחרו) רוצים לבחור אפשרות רביעית? רשמו לנו בהערות למטה.'];
    const disabledOptions = camp['האם הקאפ והפעילויות בו מונגשות?'];
    const kidsOptions = camp['מה מקומם של ילדים בפעילויות הקאמפ?'];
    const parsedTags = extractCampTags(tags, disabledOptions, kidsOptions);

    const coverUrl = camp['השנה התוכניה תופיע גם באופציה דיגיטלית. לצורך כך נשמח לקבל מכם תמונה שמייצגת את הקאמפ. בסגנון סמל הקאמפ, חברי הקאמפ או כל דבר שלדעתכם יעביר את רוח הקאמפ.'];
    // const imageName = await downloadImageForCamp(campId, coverUrl);
    const imageName = coverUrl;


    return {
        campId: campId,
        campName: camp['שם המחנה'],
        description: camp['תיאור המחנה בעברית'],
        descriptionEn: camp['תיאור המחנה באנגלית'],
        coverUrl: imageName,
        tags: parsedTags,
    }
};

const readJsonFile = async (fileName) => readFile(fileName).then( JSON.parse );
const writeJsonFile = async (fileName, data) => {
    console.log(`Writing ${fileName}`)
    writeFile(path.join('../2018', fileName), JSON.stringify(data, null, '\t'));
}


const mainProcess = async () => {
    const camps = await readJsonFile('camps.json');
    const campsProcessed = camps.map( extractCampsData );

    const giftsRaw = await readJsonFile('gifts.json');
    const gifts = Object.keys(giftsRaw).map((key) => giftsRaw[key] );
    const giftsProcessed = [].concat.apply([], gifts.map(extractGiftData));
    applyGeneratedCampIds( campsProcessed, giftsProcessed );

    await writeJsonFile('camps.json', campsProcessed);
    await writeJsonFile('gifts.json', giftsProcessed);

    const artsRaw = await readJsonFile('art.json');
    const arts = Object.keys(artsRaw).map((key) => artsRaw[key] );
    const artsProcessed = arts.map(extractArtData);
    await writeJsonFile('arts.json', artsProcessed);
};

mainProcess()

