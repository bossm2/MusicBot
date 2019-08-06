//#region variables
var request = require('requestretry');
var EventSource = require("eventsource");
var cheerio = require('cheerio');

function myRetryStrategy(err, response, body, options) {
    //console.log(err);
	return (typeof body == 'undefined' || (err != null));
}

var musics = [];

//#endregion

//#region functions
//down_link
function down_link(link) {
    request({
        url: (link),
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
                musics[link].quality = $(this).text();
                musics[link].download = $(this).attr('href');
                console.log(musics);
            });
			};
    });
}
//class musics var
class mclass {
	constructor() {
		this.titles = '';
		this.links = '';
		this.quality = '';
		this.download = '';
	}
}
//#endregion

turlest=encodeURI("http://next1.ir/page/1/?s=شادمهر");

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
            $('div.post  div.title').each(function (i, e) {
                var link = $(this).children("a").eq(0).attr('href');
                var titles = $(this).children("a").eq(0).attr('title');
                musics[link] = new mclass();
                musics[link].link = link;
                musics[link].titles = titles;
                down_link(link);
            });
			};
    });
