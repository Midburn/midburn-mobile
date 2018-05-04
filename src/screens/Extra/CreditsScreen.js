import _ from 'lodash';
import React, { Component } from 'react';
import {View, Text, Button, Colors, Image, Avatar} from 'react-native-ui-lib';
import {ScrollView} from 'react-native';
import Strings, {isRTL} from './../../utils/Strings';


const MEMBERS = [
  {
    name: {
      he: 'רן\nגרינברג',
      en: 'Ran\nGreenberg'
    },
    avatar: require('../../../data/img/members/ran_greenberg.jpg'),
    role: {
      he: 'פיתוח',
      en: 'Dev'
    }
  },
  {
    name: {
      he: 'נועם\nאלמוג',
      en: 'Noam\nAlmog'
    },
    avatar: require('../../../data/img/members/noam_almog.jpg'),
    role: {
      he: 'פיתוח',
      en: 'Dev'
    }
  },
  {
    name: {
      he: 'עומר עמנואל\nאביסדריס',
      en: 'Omer Emanuel\nAbisdris'
    },
    avatar: require('../../../data/img/members/omer_emanuel.jpg'),
    role: {
      he: 'אפיון',
      en: 'UX'
    }
  },
  {
    name: {
      he: 'יוגב\nבן-דוד',
      en: 'Yogev\nBen-David'
    },
    avatar: require('../../../data/img/members/yogev_ben_david.jpg'),
    role: {
      he: 'פיתוח',
      en: 'Dev'
    }
  },
  {
    name: {
      he: 'אביה\nנבון',
      en: 'Aviya\nNavon'
    },
    avatar: require('../../../data/img/members/aviya_navon.png'),
    role: {
      he: 'עיצוב',
      en: 'UI'
    }
  }
];

const TEXT = {
  he: 'שלום ברנרים וברנריות אהובות ואהובים,\n' +
  '\n' +
  'כיף גדול שהגעתם לפה להנות מהתוכניה הדיגיטלית ולהכיר אותנו.\n' +
  '\n' +
  'בחרנו השנה להעניק גיפט מיוחד למידברן, להעניק חוויה ייחודית לברנרים וותיקים וחדשים כאשר הם נעזרים בתוכניה הדיגיטלית של המידברן. הגענו משילוב של רצונות כמו דאגה לאיכות הסביבה, הענקת שירות ויצירת חוויה שתאפשר למשתתפים לחוות את הברן כאנושי יחד עם הניסיון להמנע מלהדביק את הברנרים למסך הקטן.\n' +
  'נהננו לעבוד ביחד, להתלבט, לנסות, להעז, להעניק באהבה, להביא את הרעיונות הייחודים של כל אחד מאיתנו ולשמוע וללמוד מחוויות של ברנרים אחרים, וותיקים וחדשים, מבוגרים וצעירים, טכנולוגים ולא טכנולוגים – כל זאת בכדי להתחשב בכל הצרכים והרצונות של כולם. נשמח לשמוע את הפידבקים של כולכם לתוכניה הדיגיטלית, להענקת שירות טוב יותר לשנה הבאה.\n' +
  '\n' +
  'יצרנו את התוכניה הדיגיטלית באהבה כדי שתוכלו להנות מהברן המיוחד שלנו. אתם מוזמנים להנות מהגיפטינג הייחודי שהכנסנו, כל משחקי הברן שיעזרו לכם לצאת מאזור הנוחות ולהכיר אנשים חדשים ולהנות מהברן. אנא תהנו מהאפליקציה אבל השתדלו להשאיר את הפלאפון בקאמפ. ואם כבר לקחתם אותו איתכם, תנסו להמנע מלברוח אליו כשמשעמם ותזכרו לשאול אנשים לפני שאתם מצלמים.\n' +
  '\n' +
  'תהנו מהתוכנייה ותהנו מהברן,\n' +
  '\n' +
  'באהבה רבה\n' +
  'אנחנו',
  en: ''
};

export default class CreditsScreen extends Component {


  _renderTeamMember(member, index) {
    return (
      <View key={index} center margin-8 marginH-30>
        <View padding-8>
          <Avatar center size={80} imageSource={member.avatar}/>
        </View>
        <View paddingV-1>
          <Text text70 black center style={{fontWeight: '600'}}>{isRTL() ? member.name.he : member.name.en}</Text>
          <Text text90 center dark40 style={{fontWeight: '500'}}>{isRTL() ? member.role.he : member.role.en}</Text>
        </View>
      </View>
    );
  }

  _renderText() {
    return (
      <View margin-15>
        <View marginB-12>
          <Text text40 black style={{writingDirection: isRTL() ? 'rtl' : 'ltr', fontWeight: '600'}}>
            {Strings('FEW_WORDS')}
          </Text>
        </View>
        <Text text60 black style={{writingDirection: isRTL() ? 'rtl' : 'ltr', fontWeight: '400', lineHeight: 28}}>
          {TEXT.he}
        </Text>
      </View>
    );

  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View flex row center style={{flexWrap: 'wrap'}}>

          {_.map(MEMBERS, (member, i) => this._renderTeamMember(member, i))}
          {this._renderText()}
        </View>
      </ScrollView>
    );
  }
}

