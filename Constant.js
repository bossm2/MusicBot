const { buttonclass } = require("./buttonclass");
var key = {};
//test change
//#endregion
//#region main token...
// const ttoken = '686260796:AAHf5GTSQBLTDGu-POkQTliA_NCfbEga814';
// const gtoken = '5d82f9a31d2371743e015cf8d4095a861569a48b57e625a08e6411e643e54e01'
// const btoken = 'wss://api.bale.ai/v1/bots/34ee5d5573c7371338b34c3c6e6d07af2c8ccfe8'
// const stoken = "https://bot.sapp.ir/piKBXezlook7Evje1bCOzgsp3_pnPKKCa077j3rl_Pf8_htFcHAujrj5eGLRrOXpUyG9f297uuHO6QNxkNOhOkCfB7K-LLhh9SgheCQDFqXcaKmNHfxy18L8GglU8dteoFF7LLfJQhp9REln";
// const s2token = "https://bot.sapp.ir/iZVYt6vAeA9XPR1rAgM6oUMDM8u7TJoHb8Luyyh4iUQJlcqNgpHIMe1sULtKM438FRGZ0xKVIM5k92-6dhuw3_Dej7set2eICq6l5ET2AWB7hCJPgm-LCHR2uidQ9jFC6df79blZx-WekhtR";
//#endregion
//#region test token...
const ttoken = '822356476:AAFQqrTtxMsOutsngSb8k5pFUnDB843Ihns';
exports.ttoken = ttoken;
const b2token = '614519785:bcf6be1ed458c9552b2104a5f94ebed52c433f15';
exports.b2token = b2token;
const gtoken = '73f0bc691e635189577ade8eab87eaf2cfad413e642453b4858f334569e14446';
exports.gtoken = gtoken;
const btoken = 'wss://api.bale.ai/v1/bots/38877003bfdd1ff7a3760bc06543366767e657a8';
exports.btoken = btoken;
const stoken = "https://bot.sapp.ir/F8pfqudTf2n6QUdJVpfmdYUhnlKhF4PdLHjAK5FSS9QWN249DbtLgrjuiaGE2MDfvmCq9i83tHp6HEpzsBuOIgS6SLAPrHTewPZp9fyE02-_p7uZXxCkHxakZGbwJTDXbLhNCCewesY3dwwM";
exports.stoken = stoken;
//#endregion
//#region Connect to Bots and Messages...
//#region Button Definition...
key.start = new buttonclass([[["شروع چت تصادفی", "/runcommand"], ["تنظیمات و راهنما", "/setting"]]]);
key.startgap = new buttonclass([["✅شروع چت تصادفی", "/runcommand"]]);
key.stop = new buttonclass([["انصراف", "/backcommand"]]);
key.help = new buttonclass([["راهنما", "/help"]]);
key.command = new buttonclass([["بازگشت", "/backcommand"]]);
key.setting = new buttonclass([[["بلاک کردن", "/blocking"], ["راهنما", "/help"]], [["بلاک و گزارش تخلف", "/report"], ["بازگشت", "/backcommand"]]]);
key.yon = new buttonclass([[["بله", "/yes"], ["خیر", "/no"]]]);
var notsupportsmg = '⚡️پیام ربات: ارسال پیام های غیر متنی صرفا در پیام رسان های همسان پشتیبانی می شود.';
exports.notsupportsmg = notsupportsmg;
var blocktitle = "شما به دلیل نقض قوانین بلاک شده اید! لطفا به اصلاح خود بپردازید.";
exports.blocktitle = blocktitle;
var counttitle = "در هر ساعت تنها 10 چت می توانید انجام دهید!\nلطفا یک ساعت دیگر وارد بات شوید یا با ادمین (@Orotat) جهت اعتبار سنجی تماس حاصل فرمایید.";
exports.counttitle = counttitle;
var waittitle = "⚠️لطفا تا پایان جستجو منتظربمانید!";
exports.waittitle = waittitle;
var starttitle = "خوش اومدی، میتونم هر آهنگ یا ویدئویی که بخوای رو واست بفرستم.فقط کافیه یه قسمتی از نام خواننده، آهنگ و یا شعرو به صورت فارسی یا فینگیلیش برام بفرستی.";
exports.starttitle = starttitle;
var welcometitle = `🌺به بات ریتمیک خوش آمدید.🌺
💫برای شروع جستجو نام خواننده یا ترانه خود را وارد کنید.
💫بات چت تصادفی در پیام رسان های سروش(برترین پیام رسان ایرانی)، بله، گپ و تلگرام با نام @RitmicBot قابل استفاده است.
💫ارتباط با ما: @Orotat`;
exports.welcometitle = welcometitle;
var helptitle = `💫برای شروع جستجو نام خواننده یا ترانه خود را وارد کنید.
💫در زمان جستجو می توانید گزینه "انصراف" را جهت بازگشت به صفحه شروع انتخاب کنید.
💫آدرس چت تصادفی در پیام رسان های مختلف:
سروش: @RitmicBot
تلگرام: @RitmicBot
گپ: @RitmicBot
بله: @RitmicBot
💫ارتباط با ما: @Orotat`;
exports.helptitle = helptitle;
var settingtitle = "لطفا یکی از گزینه ها را  انتخاب کنید.";
exports.settingtitle = settingtitle;
var isbloctitle = "آیا مایل به بلاک کردن آخرین فردی که با آن چت کرده اید یا هم اکنون چت می کنید هستید؟";
exports.isbloctitle = isbloctitle;
var isreptitle = `
آیا مایل به گزارش تخلف آخرین فردی که با آن چت کرده اید یا هم اکنون چت می کنید هستید؟
عملکرد گزارش به نحوی است که اگر شخصی توسط 3 نفر گزارش داده شود، از سمت بات برای همیشه بلاک می گردد. (بات امکان امکان پایش بر روی محتوای پیام ها را ندارد!)`;
exports.isreptitle = isreptitle;
var canceltitle = "🌑 متاسفانه شخص مقابل شما از ادامه چت انصراف داده است.";
exports.canceltitle = canceltitle;
exports.key = key;
