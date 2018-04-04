const fs = require('fs');
const {promisify} = require('util');

process.on('unhandledRejection', r => console.log(r));

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// const extractCampData = camp => {
//
//     return {
//         campId: camp.id,
//         campName_he: camp['camp_name_he'],
//         campName_en: camp['camp_name_en'],
//     }
// };

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

/*
{
  "campId" : "46991fa3-9660-4b7c-a39d-fc163eb924d6",
  "title" : "Moesaa jioqaazie caehieihi.",
  "description" : "Il co pi xopa oz haqo kecilo al ix hoke iwgene ze. Latoyo nova hamidi ibad na qoelje pezavo jope of yiag focidi se. Lebawe beda teto ojhe maki loya yo loraxa keiq mofo li heregi.",
  "address" : "3:3 D",
  "coverUrl" : "cover4.jpg",
  "iconUrl" : "icon14.jpg",
  "tags" : [ "Adult", "Alcohol" ]

}
  type: 'music',

{ event_id: 'MIDBURN2018',
  noise_level: 'noisy',
  contact_person_email: 'peeri.nirvana@gmail.com',
  contact_person_phone: '0502488787',
  camp_location_street_time: null,
  camp_name_he: '"04"',
  public_activity_area_desc: null,
  camp_name_en: '"04"',
  location_comments: null,
  accept_families: false,
  camp_activity_time: 'evening,night',
  id: 1804,
  child_friendly: false,
  contact_person_name: 'פארי אמר',
  camp_desc_he: '',
  support_art: false,
  __prototype: 'theme_camp',
  pre_sale_tickets_quota: 14,
  updated_at: '2018-03-10T21:50:56.000+02:00',
  contact_person_id: 11694,
  status: 'open',
  facebook_page_url: 'null',
  type: 'music',
  public_activity_area_sqm: null,
  created_at: null,
  safety_contact: 11694,
  moop_contact: 11694,
  main_contact: 11694,
  camp_desc_en: '',
  web_published: false,
  camp_location_area: null,
  addinfo_json: null,
  camp_location_street: null }
 */

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

/*

מסיבה, שתיה, משחק, אלכוהול, משחק
מסיבה, שתיה, טיפולבגוף או בנפש

{
    "תיאור הפעילות בעברית": "תרבות הנתינה בישראל בדגש על נתינה כספית",
    "תיאור הפעילות באנגלית": "The culture of giving (money) in Israel  ",


    "Timestamp": "2018-03-17T07:28:33.015Z",
    "Email Address": "minigolf121@gmail.com",
    "שם איש הקשר במחנה": "עופר",
    "טלפון של איש הקשר במחנה": 5066789779,
    "שם המחנה": "קוף X",
    "יום בו מתרחשת הפעילות": "שלישי 15/5",
    "שעה": "06:30",
    "האם הפעילות מונגשת בשפת הסימנים?": "לא",
    "האם הפעילות מיועדת לילדים או מתאימה למבוגרים בלבד? (אם הפעילות בתחום האפור אל תסמנו כלום)": "למבוגרים בלבד - אין כניסה לילדים",
    " מה האייקונים המתארים הכי נכון את הפעילות? בחרו עד 3 אייקונים לכל היותר! (שימו לב בחירה של יותר מ-3 אפשרויות תוביל ללקיחת 3 האפשרויות הראשונות שנבחרו) אם אתם מרגישים שאתם חייבים לבחור עוד אייקון - רשמו לנו איזה בהערות למטה": "הרצאה",
    "תיאור הפעילות בעברית": "בדיקה למחוק",
    "תיאור הפעילות באנגלית": "test",
    "יש לכם הערות? שאלות? בקשות?": "לא"
  }
  {
    "campId": "d8726eec-2241-471c-90ed-68eedf2811df",
    "time": 1522150380000,
    "title": "Camp with four tags",
    "description": "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.",
    "locationName": "Shtifale",
    "locationAddress": "08:00 D ",
    "tags": [
      "Adult",
      "Sound",
      "Food",
      "Alcohol"
    ]
  },

 */


// readFile('camps.json').then(file => {
//     const camps = JSON.parse(file);
//
//
//     const midburnCamps = camps.filter(c => c['event_id'] === 'MIDBURN2018' && c['__prototype'] === 'theme_camp');
//
//     const camp = midburnCamps[0];
//     console.log(extractCampData(camp));
//
//     return writeFile('../2018/camps.json', JSON.stringify(midburnCamps, null, '\t'));
//
//     // camps.map(camp => {
//     //     camp
//     //     }
//     // );
// });

readFile('gifts.json').then(file => {
    const gifts = JSON.parse(file);
    const giftsParsed = Object.keys(gifts).map((key) => gifts[key] );

    const giftsProcessed = [].concat.apply([], giftsParsed.map(extractGiftData));

    giftsProcessed.forEach( extractCampData );

    applyGeneratedCampIds( giftsProcessed );


    return writeFile('../2018/camps.json', JSON.stringify(AllCamps, null, '\t'))
        .then( writeFile('../2018/gifts.json', JSON.stringify(giftsProcessed, null, '\t')) );
});

