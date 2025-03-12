const str='hj jh <@Yana67>j 878y bhj <@Anna97>j';
const reg=/(?<=\@)\w+/ig;
console.log(str.match(reg));

const str1='jkh 380 (50) 123 4567k 0 50 123 4567jknj+380 50 123 4567kj79 $+56_bhbjh +380975543425onjnk n9 +380 (44) 1231231 380-50-123-4567';
const reg1=/(\+?)\d+[0-9\-()\s]{10,13}(?:\d)/g;
console.log(str1.match(reg1));

const str2 = `
- 02.10 Эдик 23524 грн
- 03.10 Саша 17328,грн
- 04.10 Денис 21570 грн
- 03.10 Илья 315$
- 04.10 Денис 277 €
- 06.10 Денис 503$
- 11.10 Денис 525€
- 23.10 Илья 650 $
- 31.10 Денис 596-$
- 31.10 Тимур 2350$
- 04.10 Федя 360€
`;

const reg2 = /- (\d{2}\.\d{2}) [^\d]+ (\d+[,.]?\d*) ?(\u0433\u0440\u043d|[$\u20ac])?/g;
console.log(str2.match(reg2));

const str3='- 02.10 Эдик 23524 грн';
const reg3 = /[\d{2}\.\d{2}](\d+[,.]?\d*) ?(\u0433\u0440\u043d|[$\u20ac])?/g;
console.log(str3.match(reg3));

const str4='example_456@gmail.com';
const reg4=/^[a-z0-9_]+@[a-z0-9_\.]+\.[a-z]{2,12}$/g
console.log(reg4.test(str4));

const str5='&jhjh-example_456@gmail.com90u87 njkhk.example_456@nbm.ru8jhk@j_knkj0978 njivtyf7656';
const reg5=/[a-z0-9_]+@[a-z0-9_\.]+\.[a-z]{2,12}/g
console.log(str5.match(reg5));

const str6='#FF00FF@ jkh $#000000 jkbv_ gfgh-#87jkhh l#ffaa889 ';
const reg6=/#[a-f0-9]{6}/ig
console.log(str6.match(reg6));

const str7='knkj677.98,88nhb h02/03/25bhh_bjh765/89/09jhbjh 09.12.24 '
const reg7 = /(0[1-9]|[12][0-9]|3[01])[\.|\/](0[1-9]|1[0-2])[\.|\/](\d{2})/g;
console.log(str7.match(reg7));