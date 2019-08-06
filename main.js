//#region variables
var request = require('requestretry');
var EventSource = require("eventsource");
var cheerio = require('cheerio');
const path = require('path')
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
                var downlink = new URL(decodeURI($(this).attr('href')));
                musics[link].quality.push($(this).contents().eq(1).text().replace('دانلود', ''));
                musics[link].download.push(downlink.href);
                musics[link].name.push(path.basename(downlink.pathname).replace('Next1.ir', '@bott').replace('www.', ''));
                musics[link].type.push($(this).children('div').text());
            });
            console.log(musics);
			};
    });
}
//class musics var
class mclass {
	constructor() {
		this.titles = '';
		//this.links = '';
        this.quality = [];
        this.type = [];
        this.download = [];
        this.name = [];
	}
}
//#endregion

for (var ii = 0; ii < 20; ii++) {
turlest=encodeURI("http://next1.ir/page/" + ii + "/?s=یگانه");
    request({
        url: (turlest),
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
            var selctor = $('div.post  div.title')
            if(selctor){
            selctor.each(function (i, e) {
                var link = $(this).children("a").eq(0).attr('href');
                var titles = $(this).children("a").eq(0).attr('title');
                musics[link] = new mclass();
                //musics[link].links = link;
                musics[link].titles = titles.replace('دانلود', '').replace('جدید', '');
                down_link(link);
            });
        }
        //console.log(musics)
		};
    });
}
