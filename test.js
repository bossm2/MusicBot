// // const path = require('path')
// var request = require('requestretry');
// // var http = require('http');
// // var https = require('https');
// function myRetryStrategy(err, response, body, options) {
//     //console.log(err);
// 	return (typeof body == 'undefined' || (err != null));
// }
// // url=new URL('http://www.next1.ir/%d8%af%d8%a7%d9%86%d9%84%d9%88%d8%af-%d8%a2%d9%87%d9%86%da%af-%d8%ac%d8%af%db%8c%d8%af-%d8%b2%d8%a7%d9%86%db%8c%d8%a7%d8%b1-%d8%ae%d8%b3%d8%b1%d9%88%db%8c-%d8%a8%d8%a7-%d9%86%d8%a7%d9%85-%d8%ae%db%8c/a.mp3')
// // console.log(path.basename(url.pathname))
// var link = 'https://tapi.bale.ai/bot614519785:bcf6be1ed458c9552b2104a5f94ebed52c433f15/getUpdates'

//     request({
//         url: (link),
//         method: "GET",
//         maxAttempts: 2,
//         retryDelay: 100,
//         retryStrategy: myRetryStrategy},
//         function (error, response, body) {
//     console.log(body);

// 	if(error) {
//     console.log("Error: " + error);
//     }
//     else{
//             //console.log(musics);
// 			};
//     });

// //     var link = new URL(link);
// //     //console.log(link)
// //     var sendreq = (link.protocol == "http:") ? http : https;
// //     //console.log(sendreq)
// //         sendreq.get(link, function (res) {

// //         console.log(res.headers);
// //     });



const Telegraf = require('telegraf')
const bot = new Telegraf('614519785:bcf6be1ed458c9552b2104a5f94ebed52c433f15')

// TLS options
const tlsOptions = {
key: fs.readFileSync('/root/node/cert/server-key.pem'),
cert: fs.readFileSync('/root/node/cert/server-crt.pem'),
ca: [
    // This is necessary only if the client uses the self-signed certificate.
    fs.readFileSync('/root/node/cert/ca-crt.pem')
]
}

require('https')
.createServer(tlsOptions, bot.webhookCallback('/'))
.listen(443)



bot.on('text', (ctx) => ctx.reply('Hello World'))
bot.launch()