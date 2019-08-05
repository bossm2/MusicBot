//#region variables
//fff
//fff

var request = require('requestretry');
var EventSource = require("eventsource");
var cheerio = require('cheerio');
//const puppeteer = require('puppeteer');
function myRetryStrategy(err, response, body, options) {
    //console.log(err);
	return (typeof body == 'undefined' || (err != null));
}

//#endregion

turlest=encodeURI("http://next1.ir/page/1/?s=شادمهر");
// browser =  puppeteer.launch();
// page = browser.newPage();
// setInterval(function(){

// (async () => {
    
    
        
//         await page.goto(turlest, {waitUntil: 'load'});

//         const newPage = await page.evaluate(() => {
//         return  document.getElementsByClassName('ft-more')[0].outerText
//         });
        
//     console.log(newPage)

// })()
// },9000)

// console.log('newPage')

// //console.log(turlest)
setTimeout( function (i) {
    request({
        url: (turlest),
        method: "GET",
        maxAttempts: 2,
        retryDelay: 100,
        retryStrategy: myRetryStrategy},
        function (error, response, body) {
            //console.log(body);
	if(error) {
    console.log("Error: " + error);
    }
    else{
            $ = cheerio.load(body)
			title1 = $('strong','span').children('.span')//.attr('ft-more')
			//title2 = $(title1).text().trim();
			};
    console.log(title1);
    });

});
