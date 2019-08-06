//#region variables
var request = require('requestretry');
var EventSource = require("eventsource");
var cheerio = require('cheerio');

function myRetryStrategy(err, response, body, options) {
    //console.log(err);
	return (typeof body == 'undefined' || (err != null));
}
//#endregion

//#region functions
//down_link
function down_link(url) {
    request({
        url: (url),
        method: "GET",
        maxAttempts: 2,
        retryDelay: 100,
        retryStrategy: myRetryStrategy},
        function (error, response, body) {
	if(error) {
    console.log("Error: " + error);
    }
    else{
            $ = cheerio.load(body)
            $('div  #downloads a').each(function (i, e) {
                hobbies[i] = $(this).text();
                hobbies[i] = $(this).attr('href');
                console.log(hobbies[i]);
            });
			};
    });
}
//#endregion

turlest=encodeURI("http://next1.ir/page/1/?s=شادمهر");

var hobbies = [];

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
			// title1 = $('strong','span').children('.span')//.attr('ft-more')
            //title2 = $(title1).text().trim();
            $('div.post  div.title').each(function (i, e) {
                hobbies[i] = $(this).children("a").eq(0).attr('href');
                hobbies[i] = $(this).children("a").eq(0).attr('title');
                console.log(hobbies[i]);
            });
			};
    // console.log(title1);
    });
var aaa = [];
aaa[turlest]='aaaaaa'
console.log(aaa)
    turlest="http://next1.ir/%d8%af%d8%a7%d9%86%d9%84%d9%88%d8%af-%d8%a2%d9%87%d9%86%da%af-%d8%ac%d8%af%db%8c%d8%af-%d8%b4%d8%a7%d8%af%d9%85%d9%87%d8%b1-%d8%b9%d9%82%db%8c%d9%84%db%8c-%d8%a8%d8%a7-%d9%86%d8%a7%d9%85-%d8%aa%d8%ac/";
