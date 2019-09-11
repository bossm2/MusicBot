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



// const Telegraf = require('telegraf')
// const bot = new Telegraf('614519785:bcf6be1ed458c9552b2104a5f94ebed52c433f15')

// // TLS options
// const tlsOptions = {
// key: fs.readFileSync('/root/node/cert/server-key.pem'),
// cert: fs.readFileSync('/root/node/cert/server-crt.pem'),
// ca: [
//     // This is necessary only if the client uses the self-signed certificate.
//     fs.readFileSync('/root/node/cert/ca-crt.pem')
// ]
// }

// require('https')
// .createServer(tlsOptions, bot.webhookCallback('/'))
// .listen(443)



// bot.on('text', (ctx) => ctx.reply('Hello World'))
// bot.launch()


// const express = require('express')
// const expressApp = express()

// expressApp.use(bot.webhookCallback('/'))
// // bot.telegram.setWebhook('https://server.tld:8443/secret-path')

// expressApp.get('/', (req, res) => {
//     console.log(req);
//   res.send('Hello World!')
// })

// expressApp.listen(3000, () => {
//   console.log('Example app listening on port 3000!')
// })













// app443.post(`/bale`, (req, res) => {
// 	console.log(req.body);
// 	res.sendStatus(200);
// });

// const tlsOptions = {
// 	key: fs.readFileSync('/root/node/musicbot/cert/YOURPRIVATE.key'),
// 	cert: fs.readFileSync('/root/node/musicbot/cert/YOURPUBLIC.pem')
// 	}


// https.createServer(tlsOptions, app443)
// .listen(443, function () {
// 	console.log('Example app listening on port 443! Go to https://localhost:443/')
// });
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var server = app.listen(930, function () {
});


app.post('/', function (req, res) {
console.log(req);
});

