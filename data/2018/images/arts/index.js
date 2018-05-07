import _ from 'lodash';

export const ART_PLACEHOLDER = require('./../midburn_logo.png');


const IMAGES = {
  199: [require('./199/art1.jpg'), require('./199/art2.jpg'), require('./199/art3.jpg'), require('./199/art4.jpg')],
  225: [require('./225/art1.jpg'), require('./225/art2.jpg'), require('./225/art3.jpg'), require('./225/art4.jpg'), require('./225/art5.jpg'), require('./225/art6.jpg'), require('./225/art7.jpg'), require('./225/art8.jpg'), require('./225/art9.jpg'), require('./225/art10.jpg'), require('./225/art11.jpg'), require('./225/art12.jpg'), require('./225/art13.jpg'), require('./225/art14.jpg'), require('./225/art15.jpg'), require('./225/art16.jpg'), require('./225/art17.jpg'), require('./225/art18.jpg'), require('./225/art19.jpg'), require('./225/art20.jpg'), require('./225/art21.jpg'), require('./225/art22.jpg')],
  226: [require('./226/art1.jpg'), require('./226/art2.jpg'), require('./226/art3.jpg'), require('./226/art4.jpg'), require('./226/art5.jpg'), require('./226/art6.jpg'), require('./226/art7.jpg'), require('./226/art8.jpg')],
  227: [require('./227/art1.jpg'), require('./227/art2.jpg')],
  228: [require('./228/art1.jpg'), require('./228/art2.jpg')],
  229: [require('./229/art1.jpg'), require('./229/art2.jpg'), require('./229/art3.jpg'), require('./229/art4.jpg'), require('./229/art5.jpg'), require('./229/art6.jpg'), require('./229/art7.jpg'), require('./229/art8.jpg'), require('./229/art9.jpg'), require('./229/art10.jpg'), require('./229/art11.jpg'), require('./229/art12.jpg'), require('./229/art13.jpg'), require('./229/art14.jpg'), require('./229/art15.jpg'), require('./229/art16.jpg'), require('./229/art17.jpg'), require('./229/art18.jpg'), require('./229/art19.jpg'), require('./229/art20.jpg')],
  231: [require('./231/art1.jpg'), require('./231/art2.jpg'), require('./231/art3.jpg'), require('./231/art4.jpg'), require('./231/art5.jpg'), require('./231/art6.jpg'), require('./231/art7.jpg'), require('./231/art8.jpg'), require('./231/art9.jpg')],
  235: [require('./235/art1.jpg'), require('./235/art2.jpg'), require('./235/art3.jpg')],
  236: [require('./236/art1.jpg')],
  237: [require('./237/art1.jpg'), require('./237/art2.jpg'), require('./237/art3.jpg'), require('./237/art4.jpg'), require('./237/art5.jpg'), require('./237/art6.jpg'), require('./237/art7.jpg'), require('./237/art8.jpg'), require('./237/art9.jpg'), require('./237/art10.jpg'), require('./237/art11.jpg'), require('./237/art12.jpg'), require('./237/art13.jpg'), require('./237/art14.jpg'), require('./237/art15.jpg'), require('./237/art16.jpg'), require('./237/art17.jpg'), require('./237/art18.jpg'), require('./237/art19.jpg'), require('./237/art20.jpg'), require('./237/art21.jpg'), require('./237/art22.jpg'), require('./237/art23.jpg'), require('./237/art24.jpg'), require('./237/art25.jpg'), require('./237/art26.jpg'), require('./237/art27.jpg'), require('./237/art28.jpg'), require('./237/art29.jpg'), require('./237/art30.jpg')],
  238: [require('./238/art1.jpg'), require('./238/art2.jpg'), require('./238/art3.jpg'), require('./238/art4.jpg'), require('./238/art5.jpg'), require('./238/art6.jpg'), require('./238/art7.jpg'), require('./238/art8.jpg'), require('./238/art9.jpg'), require('./238/art10.jpg'), require('./238/art11.jpg'), require('./238/art12.jpg'), require('./238/art13.jpg'), require('./238/art14.jpg'), require('./238/art15.jpg')],
  239: [require('./239/art2.jpg'), require('./239/art3.jpg'), require('./239/art4.jpg'), require('./239/art5.jpg'), require('./239/art6.jpg'), require('./239/art7.jpg'), require('./239/art8.jpg'), require('./239/art9.jpg')],
  241: [require('./241/art1.jpg'), require('./241/art2.jpg'), require('./241/art3.jpg'), require('./241/art4.jpg'), require('./241/art5.jpg'), require('./241/art6.jpg'), require('./241/art7.jpg'), require('./241/art8.jpg')],
  242: [require('./242/art1.jpg'), require('./242/art2.jpg'), require('./242/art3.jpg'), require('./242/art4.jpg'), require('./242/art5.jpg'), require('./242/art6.jpg'), require('./242/art7.jpg'), require('./242/art8.jpg'), require('./242/art9.jpg'), require('./242/art10.jpg'), require('./242/art11.jpg')],
  243: [require('./243/art1.jpg'), require('./243/art2.jpg'), require('./243/art3.jpg'), require('./243/art4.jpg'), require('./243/art5.jpg')],
  244: [require('./244/art1.jpg'), require('./244/art2.jpg'), require('./244/art3.jpg'), require('./244/art4.jpg'), require('./244/art5.jpg'), require('./244/art6.jpg')],
  246: [require('./246/art1.jpg'), require('./246/art2.jpg'), require('./246/art3.jpg')],
  249: [require('./249/art1.jpg')],
  250: [require('./250/art1.jpg'), require('./250/art2.jpg'), require('./250/art3.jpg'), require('./250/art4.jpg')],
  252: [require('./252/art1.jpg'), require('./252/art2.jpg'), require('./252/art3.jpg'), require('./252/art4.jpg'), require('./252/art5.jpg'), require('./252/art6.jpg'), require('./252/art7.jpg'), require('./252/art8.jpg'), require('./252/art9.jpg'), require('./252/art10.jpg'), require('./252/art11.jpg'), require('./252/art12.jpg'), require('./252/art13.jpg'), require('./252/art14.jpg'), require('./252/art15.jpg'), require('./252/art16.jpg'), require('./252/art17.jpg')],
  253: [require('./253/art1.jpg'), require('./253/art2.jpg'), require('./253/art3.jpg'), require('./253/art4.jpg'), require('./253/art5.jpg')],
  254: [require('./254/art1.jpg'), require('./254/art2.jpg'), require('./254/art3.jpg'), require('./254/art4.jpg'), require('./254/art5.jpg')],
  255: [require('./255/art1.jpg'), require('./255/art2.jpg'), require('./255/art3.jpg'), require('./255/art4.jpg'), require('./255/art5.jpg'), require('./255/art6.jpg')],
  256: [require('./256/art1.jpg'), require('./256/art2.jpg'), require('./256/art3.jpg'), require('./256/art4.jpg'), require('./256/art5.jpg')],
  257: [require('./257/art1.jpg'), require('./257/art2.jpg'), require('./257/art3.jpg'), require('./257/art4.jpg'), require('./257/art5.jpg'), require('./257/art6.jpg'), require('./257/art7.jpg'), require('./257/art8.jpg'), require('./257/art9.jpg'), require('./257/art10.jpg'), require('./257/art11.jpg'), require('./257/art12.jpg'), require('./257/art13.jpg'), require('./257/art14.jpg'), require('./257/art15.jpg'), require('./257/art16.jpg'), require('./257/art17.jpg')],
  258: [require('./258/art1.jpg')],
  259: [require('./259/art1.jpg')],
  260: [require('./260/art1.jpg'), require('./260/art2.jpg')],
  261: [require('./261/art1.jpg'), require('./261/art2.jpg'), require('./261/art3.jpg'), require('./261/art4.jpg'), require('./261/art5.jpg'), require('./261/art6.jpg'), require('./261/art7.jpg')],
  264: [require('./264/art1.jpg'), require('./264/art2.jpg'), require('./264/art3.jpg'), require('./264/art4.jpg'), require('./264/art5.jpg'), require('./264/art6.jpg'), require('./264/art7.jpg'), require('./264/art8.jpg'), require('./264/art9.jpg')],
  265: [require('./265/art1.jpg'), require('./265/art2.jpg'), require('./265/art3.jpg')],
  266: [require('./266/art1.jpg'), require('./266/art2.jpg'), require('./266/art3.jpg'), require('./266/art4.jpg'), require('./266/art5.jpg')],
  269: [require('./269/art1.jpg'), require('./269/art2.jpg'), require('./269/art3.jpg')],
  271: [require('./271/art1.jpg')],
  273: [require('./273/art1.jpg'), require('./273/art2.jpg'), require('./273/art3.jpg'), require('./273/art4.jpg'), require('./273/art5.jpg')],
  278: [require('./278/art1.jpg'), require('./278/art2.jpg'), require('./278/art3.jpg'), require('./278/art4.jpg')],
  279: [require('./279/art1.jpg')],
  282: [require('./282/art1.jpg'), require('./282/art2.jpg'), require('./282/art3.jpg'), require('./282/art4.jpg'), /*require('./282/art5.jpg'), */require('./282/art6.jpg'), require('./282/art7.jpg'), require('./282/art8.jpg'), require('./282/art9.jpg')],
  284: [require('./284/art1.jpg'), require('./284/art2.jpg'), require('./284/art3.jpg')],
  285: [require('./285/art1.jpg'), require('./285/art2.jpg'), require('./285/art3.jpg'), require('./285/art4.jpg')],
  286: [require('./286/art1.jpg'), require('./286/art2.jpg')],
  287: [require('./287/art1.jpg'), require('./287/art2.jpg')],
  288: [require('./288/art1.jpg'), require('./288/art2.jpg'), require('./288/art3.jpg'), require('./288/art4.jpg')],
  289: [require('./289/art1.jpg'), require('./289/art2.jpg')],
  290: [require('./290/art1.jpg')],
  291: [require('./291/art1.jpg'), require('./291/art2.jpg'), require('./291/art3.jpg'), require('./291/art4.jpg'), require('./291/art5.jpg'), require('./291/art6.jpg'), require('./291/art7.jpg'), require('./291/art8.jpg')],
  293: [require('./293/art1.jpg'), require('./293/art2.jpg'), require('./293/art3.jpg'), require('./293/art4.jpg'), require('./293/art5.jpg'), require('./293/art6.jpg'), require('./293/art7.jpg'), require('./293/art8.jpg'), require('./293/art9.jpg'), require('./293/art10.jpg'), require('./293/art11.jpg'), require('./293/art12.jpg'), require('./293/art13.jpg'), require('./293/art14.jpg'), require('./293/art15.jpg'), require('./293/art16.jpg'), require('./293/art17.jpg'), require('./293/art18.jpg'), require('./293/art19.jpg')],
  294: [require('./294/art1.jpg'), require('./294/art2.jpg'), require('./294/art3.jpg'), require('./294/art4.jpg')],
  295: [require('./295/art1.jpg'), require('./295/art2.jpg'), require('./295/art3.jpg'), require('./295/art4.jpg'), require('./295/art5.jpg'), require('./295/art6.jpg'), require('./295/art7.jpg'), require('./295/art8.jpg'), require('./295/art9.jpg')],
  296: [require('./296/art1.jpg'), require('./296/art2.jpg'), require('./296/art3.jpg'), require('./296/art4.jpg'), require('./296/art5.jpg')],
  297: [require('./297/art1.jpg'), require('./297/art2.jpg'), require('./297/art3.jpg')],
  298: [require('./298/art1.jpg'), require('./298/art2.jpg'), require('./298/art3.jpg'), require('./298/art4.jpg'), require('./298/art5.jpg'), require('./298/art6.jpg'), require('./298/art7.jpg'), require('./298/art8.jpg'), require('./298/art9.jpg')],
  299: [require('./299/art1.jpg'), require('./299/art2.jpg'), require('./299/art3.jpg'), require('./299/art4.jpg')],
  300: [require('./300/art1.jpg'), require('./300/art2.jpg'), require('./300/art3.jpg'), require('./300/art4.jpg'), require('./300/art5.jpg'), require('./300/art6.jpg')],
  302: [require('./302/art1.jpg'), require('./302/art2.jpg'), require('./302/art3.jpg')],
  303: [require('./303/art1.jpg')],
  304: [require('./304/art1.jpg'), require('./304/art2.jpg')],
  305: [require('./305/art1.jpg'), require('./305/art2.jpg'), require('./305/art3.jpg'), require('./305/art4.jpg')],
  306: [require('./306/art1.jpg'), require('./306/art2.jpg'), require('./306/art3.jpg'), require('./306/art4.jpg'), require('./306/art5.jpg'), require('./306/art6.jpg')],
  307: [require('./307/art1.jpg'), require('./307/art2.jpg'), require('./307/art3.jpg'), require('./307/art4.jpg'), require('./307/art5.jpg'), require('./307/art6.jpg'), require('./307/art7.jpg'), require('./307/art8.jpg'), require('./307/art9.jpg'), require('./307/art10.jpg'), require('./307/art11.jpg'), require('./307/art12.jpg'), require('./307/art13.jpg'), require('./307/art14.jpg'), require('./307/art15.jpg'), require('./307/art16.jpg'), require('./307/art17.jpg'), require('./307/art18.jpg'), require('./307/art19.jpg'), require('./307/art20.jpg'), require('./307/art21.jpg'), require('./307/art22.jpg'), require('./307/art23.jpg'), require('./307/art24.jpg')],
  308: [require('./308/art1.jpg'), require('./308/art2.jpg'), require('./308/art3.jpg'), require('./308/art4.jpg'), require('./308/art5.jpg'), require('./308/art6.jpg'), require('./308/art7.jpg')],
  309: [require('./309/art1.jpg'), require('./309/art2.jpg'), require('./309/art3.jpg'), require('./309/art4.jpg')],
  310: [require('./310/art1.jpg'), require('./310/art2.jpg')],
  312: [require('./312/art1.jpg')],
  311: [require('./311/art1.jpg'), require('./311/art2.jpg'), require('./311/art3.jpg'), require('./311/art4.jpg'), require('./311/art5.jpg'), require('./311/art6.jpg')],
  314: [require('./314/art1.jpg')],
  316: [require('./316/art1.jpg'), require('./316/art2.jpg'), require('./316/art3.jpg'), require('./316/art4.jpg')],
  319: [require('./319/art1.jpg'), require('./319/art2.jpg')],
  320: [require('./320/art1.jpg'), require('./320/art2.jpg'), require('./320/art3.jpg'), require('./320/art4.jpg')],
  324: [require('./324/art1.jpg'), require('./324/art2.jpg')],
  326: [require('./326/art1.jpg'), require('./326/art2.jpg'), require('./326/art3.jpg'), require('./326/art4.jpg'), require('./326/art5.jpg'), require('./326/art6.jpg'), require('./326/art7.jpg'), require('./326/art8.jpg'), require('./326/art9.jpg'), require('./326/art10.jpg')],
  328: [require('./328/art1.jpg'), require('./328/art2.jpg'), require('./328/art3.jpg'), require('./328/art4.jpg'), require('./328/art5.jpg'), require('./328/art6.jpg'), require('./328/art7.jpg'), require('./328/art8.jpg')],
  329: [require('./329/art1.jpg'), require('./329/art2.jpg'), require('./329/art3.jpg'), require('./329/art4.jpg'), require('./329/art5.jpg')],
  330: [require('./330/art1.jpg')],
  331: [require('./331/art1.jpg'), require('./331/art2.jpg'), require('./331/art3.jpg')],
  338: [require('./338/art1.jpg')],
  340: [require('./340/art1.jpg'), require('./340/art2.jpg'), require('./340/art3.jpg'), require('./340/art4.jpg'), require('./340/art5.jpg'), require('./340/art6.jpg')],
  342: [require('./342/art1.jpg'), require('./342/art2.jpg'), require('./342/art3.jpg')],
  343: [require('./343/art1.jpg'), require('./343/art2.jpg'), require('./343/art3.jpg'), require('./343/art4.jpg')],
  345: [require('./345/art1.jpg'), require('./345/art2.jpg'), require('./345/art3.jpg'), require('./345/art4.jpg')],
  346: [require('./346/art1.jpg'), require('./346/art2.jpg'), require('./346/art3.jpg'), require('./346/art4.jpg'), require('./346/art5.jpg'), require('./346/art6.jpg')],
  347: [require('./347/art1.jpg'), require('./347/art2.jpg'), require('./347/art3.jpg'), require('./347/art4.jpg'), require('./347/art5.jpg'), require('./347/art6.jpg')],
  348: [require('./348/art1.jpg')],
  350: [require('./350/art1.jpg'), require('./350/art2.jpg'), require('./350/art3.jpg'), require('./350/art4.jpg'), require('./350/art5.jpg')],
  352: [require('./352/art1.jpg')],
  353: [require('./353/art1.jpg')],
  354: [require('./354/art1.jpg')],
  355: [require('./355/art1.jpg'), require('./355/art2.jpg'), require('./355/art3.jpg'), require('./355/art4.jpg'), require('./355/art5.jpg')],
  356: [require('./356/art1.jpg'), require('./356/art2.jpg'), require('./356/art3.jpg'), require('./356/art4.jpg'), require('./356/art5.jpg'), require('./356/art6.jpg')],
  358: [require('./358/art1.jpg'), require('./358/art2.jpg'), require('./358/art3.jpg'), require('./358/art4.jpg')],
  359: [require('./359/art1.jpg'), require('./359/art2.jpg'), require('./359/art3.jpg'), require('./359/art4.jpg'), require('./359/art5.jpg'), require('./359/art6.jpg'), require('./359/art7.jpg'), require('./359/art8.jpg')],
  362: [require('./362/art1.jpg'), require('./362/art2.jpg'), require('./362/art3.jpg')],
  363: [require('./363/art1.jpg'), require('./363/art2.jpg'), require('./363/art3.jpg'), require('./363/art4.jpg'), require('./363/art5.jpg')],
  364: [require('./364/art1.jpg'), require('./364/art2.jpg'), require('./364/art3.jpg'), require('./364/art4.jpg'), require('./364/art5.jpg'), require('./364/art6.jpg'), require('./364/art7.jpg'), require('./364/art8.jpg')],
  365: [require('./365/art1.jpg'), require('./365/art2.jpg'), require('./365/art3.jpg'), require('./365/art4.jpg'), require('./365/art5.jpg'), require('./365/art6.jpg')],
  366: [require('./366/art1.jpg'), require('./366/art2.jpg'), require('./366/art3.jpg'), require('./366/art4.jpg'), require('./366/art5.jpg'), require('./366/art6.jpg')],
  368: [require('./368/art1.jpg'), require('./368/art2.jpg')],
  369: [require('./369/art1.jpg'), require('./369/art2.jpg'), require('./369/art3.jpg'), require('./369/art4.jpg'), require('./369/art5.jpg'), require('./369/art6.jpg'), require('./369/art7.jpg')],
  370: [require('./369/art1.jpg'), require('./369/art2.jpg'), require('./369/art3.jpg'), require('./369/art4.jpg')],
};

export function getImageForArtId(id) {
  if (!id || !IMAGES[id]) {
    return ART_PLACEHOLDER;
  }
  return IMAGES[id][0];
}

export function getImagesForArtId(id) {
  if (!id || !IMAGES[id]) {
    return ART_PLACEHOLDER;
  }
  return IMAGES[id];
}