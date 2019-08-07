const path = require('path')
var request = require('requestretry');
var http = require('http');
var https = require('https');
function myRetryStrategy(err, response, body, options) {
    //console.log(err);
	return (typeof body == 'undefined' || (err != null));
}
url=new URL('http://www.next1.ir/%d8%af%d8%a7%d9%86%d9%84%d9%88%d8%af-%d8%a2%d9%87%d9%86%da%af-%d8%ac%d8%af%db%8c%d8%af-%d8%b2%d8%a7%d9%86%db%8c%d8%a7%d8%b1-%d8%ae%d8%b3%d8%b1%d9%88%db%8c-%d8%a8%d8%a7-%d9%86%d8%a7%d9%85-%d8%ae%db%8c/a.mp3')
console.log(path.basename(url.pathname))
var link = 'https://sibbank.ir/'

    // request({
    //     url: (link),
    //     method: "HEAD",
    //     maxAttempts: 2,
    //     retryDelay: 100,
    //     retryStrategy: myRetryStrategy},
    //     function (error, response, body) {
    // console.log(response.headers);

	// if(error) {
    // console.log("Error: " + error);
    // }
    // else{
    //         //console.log(musics);
	// 		};
    // });

    var link = new URL(link);
    //console.log(link)
    var sendreq = (link.protocol == "http:") ? http : https;
    //console.log(sendreq)
        sendreq.get(link, function (res) {

        console.log(res.headers['content-length']);
    });