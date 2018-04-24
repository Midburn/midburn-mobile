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
        const giftsForCamp = gifts.filter( g => g.campName === camp.campName );

        if (!giftsForCamp || giftsForCamp.length === 0) {
            console.log(`${camp.campId} ${camp.campName}`)
        }
        giftsForCamp.forEach( g => {
            g.campId = camp.campId;
            g.campName = camp.campName;
            g.campNameEn = camp.campNameEn;
            g.location = camp.location;
            g.locationEn = camp.locationEn;
        } );
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

const otherTags = [];

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

    if (tags.includes('אלכוהול')) {
        extractedTags.push('Alcohol')
    }
    if (tags.includes('פעילות בשפה האנגלית')) {
        extractedTags.push('English')
    }
    if (tags.includes('מעגל שיח') || tags.includes('שיחת נפש בהקשבה מלאה') || tags.includes('האזנה פעילה') ||
        tags.includes('קריוקי!!') || tags.includes('מינגלינג') || tags.includes('הפעלה')) {
        extractedTags.push('Mingling')
    }
    if (tags.includes('קרב ראווה בזירת אגרוף הכריות') || tags.includes('עונשים תנכיים') || tags.includes('תחרות') ||
        tags.includes('ריצה') || tags.includes('משימות :)') || tags.includes('פעילות חופשית בחדר חושך') ||
        tags.includes('הפעלה') || tags.includes('ציור בתנועה') || tags.includes('משחק')) {
        extractedTags.push('Games')
    }
    if (tags.includes('אוכל') || tags.includes('שתיה') || tags.includes('התרעננות')) {
        extractedTags.push('FoodAndDrinks')
    }
    if (tags.includes('מסיבה')) {
        extractedTags.push('Party')
    }
    if (tags.includes('יצירה')) {
        extractedTags.push('Creative')
    }
    if (tags.includes('הופעה') || tags.includes('האזנה למוסיקה') || tags.includes('הופעה עבור ילדים') ||
        tags.includes('סרט') || tags.includes('קרב ראווה בזירת אגרוף הכריות') || tags.includes('טקס') ||
        tags.includes('מצעד') || tags.includes('קריוקי!!')) {
        extractedTags.push("Live")
    }
    if (tags.includes('הרצאה') || tags.includes('הרצאה בנושא מיניות') || tags.includes('מעגל נשים') ||
        tags.includes('סדנה')) {
        extractedTags.push('Workshop')
    }
    if (tags.includes('התרעננות') || tags.includes('מעגל שיח') || tags.includes('מדיטציה') ||
        tags.includes('מדיטציה או יוגה') || tags.includes('יוגה או מדיטציה') || tags.includes('שיחת נפש בהקשבה מלאה') ||
        tags.includes('האזנה פעילה') || tags.includes('פעילות גוף') || tags.includes('אקרו-יוגה') ||
        tags.includes('יוגה') || tags.includes('טיפולבגוף או בנפש') || tags.includes('תפילה')) {
        extractedTags.push('BodyAndSoul')
    }
    if (tags.includes('שנצ') || tags.includes('צ\'ילינג טיים! ( זמן התרעננות) או מתאים לשנצ') || tags.includes('מנוחה') ||
        tags.includes('זולה') || tags.includes('chill') || tags.includes('צ׳יל אאוט בסלון') ||
        tags.includes('להרגע עם השקיעה') || tags.includes('התערסלות')) {
        extractedTags.push('Sleep')
    }
    if (extractedTags.length === 0) {
        extractedTags.push("Other")
        otherTags.push(tags)
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
            campNameEn: gift['שם המחנה'],
            description: gift['תיאור הפעילות בעברית'],
            descriptionEn: gift['תיאור הפעילות באנגלית'],
            title: gift['תיאור הפעילות בעברית'],
            titleEn: gift['תיאור הפעילות באנגלית'],
            time: date.getTime() / 1000,
            locationName: gift['שם המחנה'],
            locationNameEn: gift['שם המחנה'],
            tags: giftTags
        }
    });
};

const downloadArtImage = async (artId, {name, url}) => {
    const baseDir = path.resolve(path.join('..', '2018', 'images', 'arts', `${artId}`));
    await ensureDir(baseDir);
    const file = path.resolve(path.join(baseDir, name))
    await download.image({
        url: url,
        dest: file,
    });
};

const extractArtData = async art => {
    const artId = art['Id'];
    const imageUrls = await locateArtImages(artId);

    await Promise.all(imageUrls.map( async artUrl => await downloadArtImage(artId, artUrl) ));

    return {
        artId: artId,
        name: art['Name'],
        nameEn: art['En name'],
        title: art['Subtitle'],
        titleEn: art['En subtitle'],
        description: art['Description'],
        descriptionEn: art['Description'],
        artist: art['Contact name'],
        artistEn: art['Contact name'],
        philosophy: art['Dreamprop philosophy'],
        philosophyEn: art['Dreamprop philosophy'],
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

const extractCampTags = (rawTags, disabledOptions, kidsOrAdults) => {

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


    const tags = rawTags.split(',')
                        .map(s => s.trim());

    if (tags.includes('בר/ מגיש משקאות אלכוהולים')) {
        extractedTags.push("Alcohol")
    }
    if (tags.includes('מסיבות')) {
        extractedTags.push("Party")
    }
    if (tags.includes('מגיש אוכל / שתיה (לא אלכוהולית)')) {
        extractedTags.push("FoodAndDrinks")
    }
    if (tags.includes('משחקים')) {
        extractedTags.push("Play")
    }
    if (tags.includes('יצירה')) {
        extractedTags.push("Creative")
    }
    if (tags.includes('דוברי אנגלית')) {
        extractedTags.push("English")
    }
    if (tags.includes('סדנאות')) {
        extractedTags.push("Workshop")
    }
    if (tags.includes('מתאים לשנ״צ')) {
        extractedTags.push("Sleep")
    }
    if (tags.includes('טיפול בגוף או בנפש')) {
        extractedTags.push("BodyAndSoul")
    }
    if (tags.includes('הופעות / מוזיקה חיה')) {
        extractedTags.push("Live")
    }
    if (extractedTags.length === 0) {
        extractedTags.push("Other")
    }

    return extractedTags;
};

const downloadImageForCamp = async (campId, coverUrl) => {
    if ((!coverUrl || /^\s*$/.test(coverUrl))) {
        console.log(`Empty cover url ${coverUrl}`)
        return "";
    }

    // Compress bash with Imagemagik
    //find . -type f -iname "*.jpg" -exec convert \{\} -resize 750x444\> -sharpen 1.5 -quality 80 \{\} \;

    const fileName = 'coverUrl.jpg'
    const baseDir = path.resolve(path.join('..', '2018', 'images', 'camps', `${campId}`));
    await ensureDir(baseDir);
    const file = path.resolve(path.join(baseDir, fileName));
    const imageId = coverUrl.split('=')[1];
    await download.image({
        url: `https://drive.google.com/uc?export=download&id=${imageId}`,
        dest: file,
    });
    return fileName
};


const extractCampsData = async camp => {

    const campId = camp['מזהה מחנה'];
    const tags = camp['סוג המחנה - בחרו עד 3 אייקונים שמציגים אתכם בצורה הטובה ביותר וממצים את הפעילויות שאתם עושים (שימו לב בחירה של יותר מ-3 אפשרויות תוביל ללקיחת 3 האפשרויות הראשונות שנבחרו) רוצים לבחור אפשרות רביעית? רשמו לנו בהערות למטה.'];
    const disabledOptions = camp['האם הקאפ והפעילויות בו מונגשות?'];
    const kidsOptions = camp['מה מקומם של ילדים בפעילויות הקאמפ?'];
    const parsedTags = extractCampTags(tags, disabledOptions, kidsOptions);

    // const coverUrl = camp['השנה התוכניה תופיע גם באופציה דיגיטלית. לצורך כך נשמח לקבל מכם תמונה שמייצגת את הקאמפ. בסגנון סמל הקאמפ, חברי הקאמפ או כל דבר שלדעתכם יעביר את רוח הקאמפ.'];
    // await downloadImageForCamp(campId, coverUrl);

    return {
        campId: campId,
        campName: camp['שם המחנה'],
        campNameEn: camp['שם מחנה אנגלית'],
        description: camp['תיאור המחנה בעברית'],
        descriptionEn: camp['תיאור המחנה באנגלית'],
        location: camp['מיקום'],
        locationEn: camp['מיקום אנגלית'],
        // coverUrl: imageName,
        tags: parsedTags,
    }
};

const readJsonFile = async (fileName) => readFile(fileName).then( JSON.parse );
const writeJsonFile = async (fileName, data) => {
    console.log(`Writing ${fileName}`)
    writeFile(path.join('../2018', fileName), JSON.stringify(data, null, '\t'));
}

const updateAddressAndCampName = (camp, addresses) => {
    const address = addresses.filter(a => a['קאמפ'] === camp.campName || a.override === camp.campId );

    if (!address || address.length === 0) {
        console.log(`cannot find match for ${camp.campName}`)
    } else {
        const a = address[0];
        camp.campName = a['קאמפ'];
        camp.campNameEn = a['Camp'];
        camp.location = `${a['רחוב']} ${a['שעה']}`;
        camp.locationEn = `${a['שעה']} ${a['Street']}`;
    }
    return camp;
};

const updateGiftAddressAndCampName = (gift, camps) => {
    const skip = [ 'גיזוטה', 'דרקאריס', 'אינסנטי' ];

    if (gift.campId === '' && skip.indexOf(gift.campName) > -1) {
        return gift;
    }

    const campFind = camps.filter( c => c.campId === gift.campId );

    if (!campFind || campFind.length === 0) {
        console.log(`cannot find match for gift ${gift}`)
    } else {
        const camp = campFind[0];
        gift.campName = camp.campName;
        gift.campNameEn = camp.campNameEn;
        gift.location = camp.location;
        gift.locationEn = camp.locationEn;
    }
    return gift;
};


const mainProcess = async () => {
    const addresses = await readJsonFile('address.json');
    const camps = await readJsonFile('camps2.json');
    //Promise.all( arts.map(async art => await extractArtData(art)) );
    const campsProcessed = await Promise.all( camps.map(async c => extractCampsData(c) ) );

    const giftsRaw = await readJsonFile('gifts.json');
    const gifts = Object.keys(giftsRaw).map((key) => giftsRaw[key] );
    const giftsProcessed = [].concat.apply([], gifts.map(extractGiftData));
    applyGeneratedCampIds( campsProcessed, giftsProcessed );
    campsProcessed.map(c => updateAddressAndCampName(c, addresses) );
    giftsProcessed.map( g => updateGiftAddressAndCampName(g, campsProcessed));

    console.log(otherTags.reduce((a, b) => a.concat(b), []).map(s => s.trim()).filter((v, i, a) => a.indexOf(v) === i))

    await writeJsonFile('camps.json', campsProcessed);
    await writeJsonFile('gifts.json', giftsProcessed);

    // const artsRaw = await readJsonFile('art.json');
    // const arts = Object.keys(artsRaw).map((key) => artsRaw[key] );
    // const artsProcessed = await Promise.all( arts.map(async art => await extractArtData(art)) );
    // await writeJsonFile('arts.json', artsProcessed);
};

mainProcess()

