//#region variables
const { b2token,btoken, stoken, s2token, ttoken, welcometitle, canceltitle, blocktitle, counttitle, waittitle, starttitle, notsupportsmg, gtoken, settingtitle, isreptitle, isbloctitle, helptitle,key } = require("./Constant.js");
var cheerio = require('cheerio');
const path = require('path');
var EventSource = require("eventsource");
var request = require('requestretry');
var express = require('express');
var bodyParser = require('body-parser');
var NodeWebSocket = require("ws");
const ReconnectingWebsocket = require('reconnecting-websocket');
var mysql = require('mysql');
var fs = require('fs');
var https = require('https');

var http = require('http');
const Slimbot = require('slimbot');
const Slimbot2 = require('slimbot2');
const bot = new Slimbot(ttoken);
const bot2 = new Slimbot2(b2token);
var app = express();
var bale2 = express();
//const crypto = require('crypto');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var wait_bale = [];
var musics = [];
var tmp = {};
var atmp = {};

function myRetryStrategy(err, response, body, options) {
    //console.log(err);
	return (typeof body == 'undefined' || (err != null));
}
//#endregion
//#region Error Handling...
process.on('uncaughtException', function (e) {
	console.log(e);
	fs.appendFile('/root/node/Error.txt', (JSON.stringify(e) + "\r\n"), function (err) {
		if (err) console.log(err);
		process.exit();
	});
});


//#endregion
//#region pre configiuration
// const RECONNECTING_OPTIONS = {
// 	connectionTimeout: 5000,
// 	constructor: typeof window !== 'undefined' ? WebSocket : NodeWebSocket,
// 	debug: true,
// 	maxReconnectionDelay: 4000,
// 	maxRetries: Infinity,
// 	minReconnectionDelay: 10,
// 	reconnectionDelayGrowFactor: 1.3,
// };
// RECONNECTING_OPTIONS.WebSocket = require('ws');
// const socket = new ReconnectingWebsocket(
// 	() => btoken,
// 	undefined,
// 	RECONNECTING_OPTIONS
// );
// socket.addEventListener('open', () => {
// 	console.log('connected');
// });
// socket.addEventListener('close', (e) => {
// 	console.log(e);
// });
// socket.addEventListener('error', (e) => {
// 	console.log(e);
// });
var evtSource = new EventSource((stoken + "/getMessage"), { Header: { "Content-Type": "application/stream+json", "Accept": "application/stream+json", 'Connection': 'keep-alive' } });
evtSource.onerror = function (err) {
	if (err) console.log(err);
}
//conection string mysql
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "!@#123qwe",
	database: "ritmic",
	multipleStatements: true
});
//connect to mysql 
con.connect(function (err) {
	if (err) console.log(err);
})
con.on('error', function (err) {
	if (err) console.log(err);
});
//#endregion
//#region send file
class tmpclass {
	constructor() {
		this.wait = '';
	}
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
		this.json = [];
	}
}
//sample JSON 
class balejs {
	constructor(text, usertocken, keyboard) {
		var x = usertocken.slice(2).split('|');
		this.$type = "Request";
		this.body = {
			"$type": "SendMessage",
			"randomId": (Math.floor(Math.random() * 1800000).toString() + Math.floor(Math.random() * 4000000).toString() + Math.floor(Math.random() * 55000).toString()),
			"peer": {
				"$type": "User",
				"accessHash": x[1],
				"id": x[0]
			},
			"message": {
				"$type": "TemplateMessage",
				"templateMessageId": "0",
				"generalMessage": {
					"text": text,
					"$type": "Text"
				},
				"btnList": keyboard
			},
			"quotedMessage": null
		};
		this.service = 'messaging';
		this.id = '0';
	}
}
class balesenphoto {
	constructor(fileId, accessHash, size, usertocken, prop) {
		var x = usertocken.slice(2).split('|');
		this.$type = "Request";
		this.body = {
			"$type": "SendMessage",
			"randomId": (Math.floor(Math.random() * 1800000).toString() + Math.floor(Math.random() * 4000000).toString() + Math.floor(Math.random() * 55000).toString()),
			"peer": {
				"$type": "User",
				"accessHash": x[1],
				"id": x[0]
			},
			"message": {
				"$type": "TemplateMessage",
				"templateMessageId": "0",
				"generalMessage": {
					"mimeType": "image/jpeg",
					"fileSize": size.toString(),
					"fileId": fileId,
					"name": prop.n,
					"accessHash": accessHash.toString(),
					"$type": "Document",
					"fileStorageVersion": 1,
					"caption": {
						"$type": "Text",
						"text": ''
					},
					"thumb": {
						"height": prop.h,
						"thumb": "None",
						"width": prop.w
					},
					"ext": {
						"$type": "Photo",
						"height": prop.h,
						"width": prop.w
					},
					"checkSum": "checkSum",
					"algorithm": "algorithm"
				},
				"btnList": key.stop.b
			},
			"quotedMessage": null
		};
		this.service = 'messaging';
		this.id = '0';
	}
}
class balesend_doc {
	constructor(fileId, accessHash, size, usertocken, prop) {
		var x = usertocken.slice(2).split('|');
		this.$type = "Request";
		this.body = {
			"$type": "SendMessage",
			"randomId": (Math.floor(Math.random() * 1800000).toString() + Math.floor(Math.random() * 4000000).toString() + Math.floor(Math.random() * 55000).toString()),
			"peer": {
				"$type": "User",
				"accessHash": x[1],
				"id": x[0]
			},
			//"message": {
			//"$type": "TemplateMessage",
			//"templateMessageId": "0",
			"message": {
				"mimeType": "?/?",
				"fileSize": size.toString(),
				"fileId": fileId,
				"name": prop.n,
				"accessHash": accessHash.toString(),
				"$type": "Document",
				"fileStorageVersion": 1,
				"caption": {
					"$type": "Text",
					"text": ''
				},
				thumb: null,
				ext: null,
				"checkSum": "checkSum",
				"algorithm": "algorithm"
				//	},
				//"btnList": key.stop.b
			},
			"quotedMessage": null
		};
		this.service = 'messaging';
		this.id = '0';
	}
}
class baleurljs {
	constructor(fileType, fileId, userId, id) {
		this.$type = "Request";
		this.body = {
			"$type": "GetFileDownloadUrl",
			"fileId": fileId,
			"userId": userId.toString(),
			"fileVersion": 1,
			"isServer": false,
			"isResumeUpload": false,
			"fileType": fileType
		};
		this.service = 'files';
		this.id = id;
	}
}
class baleserverjs {
	constructor(fileType, size, id) {
		this.$type = "Request";
		this.body = {
			"$type": "GetFileUploadUrl",
			"size": size,
			"crc": id,
			"isServer": false,
			"fileType": fileType
		};
		this.service = 'files';
		this.id = id;
	}
}
function smg(usertocken, textsmg, keyboard) {
		if (typeof keyboard === 'undefined') {
			if (usertocken[0] == 's') {
				sendMessage(usertocken, textsmg, 'TEXT',key.stop[usertocken[0]]);
			}
			else if (usertocken[0] == 'g') {
				sendgap(usertocken, textsmg, 'text',key.stop[usertocken[0]]);
			}
			else if (usertocken[0] == 't') {
				bot.sendMessage(usertocken.slice(2), textsmg,key.stop[usertocken[0]]);
			}
			else if (usertocken[0] == 'b') {
				sendbale(textsmg, usertocken,key.stop[usertocken[0]]);
			}
		}
		else {
			if (usertocken[0] == 's') {
				sendMessage(usertocken, textsmg, 'TEXT');
			}
			else if (usertocken[0] == 'g') {
				sendgap(usertocken, textsmg, 'text');
			}
			else if (usertocken[0] == 't') {
				bot.sendMessage(usertocken.slice(2), textsmg);
			}
			else if (usertocken[0] == 'b') {
				sendbale(textsmg, usertocken);
			}
		}
}
//massage sender function
function sendMessage(usertocken, title, type, keyboard) {
	request({
		url: (stoken + "/sendMessage"),
		method: "POST",
		headers: {
			"Content-Type": "Application/json",
			"Accept": "Application/json"
		},
		json: true,
		body: {
			"to": usertocken.slice(2),
			"type": type,
			"body": title,
			"keyboard": keyboard
		},
		maxAttempts: 50,
		retryDelay: 5000,
		retryStrategy: myRetryStrategy
	}, function (error, response, body) {
		console.log(body);
	});
}
function getbales(fileType, size) {
	var id = (Math.floor(Math.random() * 55000)).toString()
	socket.send(JSON.stringify(new baleserverjs(fileType, size, id)))
	return id;
}
function file_s(fileType, usertocken, res, url, prop,link) {
	// console.log(fileType);
	// console.log(usertocken);
	console.log(prop.n);
	request.post({
		url: url + '/uploadFile',
		formData: {
			file: res
		},
	}, function (error, response, body) {
		console.log(error);
		console.log(body);
		//console.log(response);
		if(body){ 
		JSON.parse(body)
		body3 = {
			"to": usertocken.slice(2),
			"type": "FILE",
			"fileType": fileType,
			"fileSize": prop.s,
			"fileName": prop.n,
			"fileUrl": JSON.parse(body).fileUrl
		}
		if (fileType == 'IMAGE') {
			body3.imageWidth = prop.w
			body3.imageHeight = prop.h
			body3.thumbnailUrl = JSON.parse(body).fileUrl
		}
		// console.log(body3);
		//console.log(url);
		(musics[link].json).push(body3);
		qinsert(link);
		request({
			url: (url + "/sendMessage"),
			method: "POST",
			headers: {
				"Content-Type": "Application/json",
				"Accept": "Application/json"
			},
			json: true,
			body: body3,
			maxAttempts: 50,
			retryDelay: 5000,
			retryStrategy: myRetryStrategy
		}, function (error, response, body2) {
			//console.log(body2);
		});
	}
});
}
function file_g(fileType, usertocken, res, prop,link) {

	// var tobody = {};
	// tobody.chat_id = usertocken.slice(2);
	// tobody.type = type;
	// tobody.data = title;
	request.post({
		url: "https://api.gap.im/upload",
		formData: {
			file: res
		},
		headers: {
			"token": gtoken
		},
		// form: tobody,
		maxAttempts: 1000,
		retryDelay: 100,
		retryStrategy: myRetryStrategy
	}, function (error, response, body) {
		console.log(body);
		console.log(error);
		console.log(response.attempts);
		body = JSON.parse(body)
		body.filename = prop.n
		picbody = {
			chat_id: usertocken.slice(2),
			type: fileType,
			data: JSON.stringify(body)
		}
		//send
		(musics[link].json).push(picbody);
		qinsert(link);
		request({
			url: "https://api.gap.im/sendMessage",
			method: "POST",
			headers: {
				"token": gtoken
			},
			json: true,
			form: picbody,
			maxAttempts: 1000,
			retryDelay: 100,
			retryStrategy: myRetryStrategy
		}, function (error, response, body) {
			console.log(body);
			console.log(response.attempts);
		});
	});
}
function file_b(server, usertocken, fileId, accessHash, prop, buffer, fileType,link) {
	var options = {
		url: server,
		headers: {
			'filesize': buffer.byteLength
		},
		body: buffer
	};
	request.put(options, (err, response, body) => {
		if (err) { console.log(err) } else { console.log(response.statusCode) };
		if (fileType == 'photo') {
			socket.send(JSON.stringify(new balesenphoto(fileId, accessHash, buffer.byteLength, usertocken, prop)));
			(musics[link].json).push(new balesenphoto(fileId, accessHash, buffer.byteLength, usertocken, prop));
			qinsert(link);
		}
		else {
			socket.send(JSON.stringify(new balesend_doc(fileId, accessHash, buffer.byteLength, usertocken, prop)));
			(musics[link].json).push(new balesend_doc(fileId, accessHash, buffer.byteLength, usertocken, prop));
			qinsert(link);
		}

	});
}
function file_t(fileType, usertocken, res, prop,link) {
	// var tobody = {};
	// tobody.chat_id = usertocken.slice(2);
	// tobody.type = type;
	// tobody.data = title;
	var turl = ''
	var formt = {
		chat_id: usertocken.slice(2)
	}
	//res.pathname = prop.n
	res.path = '/' + prop.n
	//console.log(res)
	switch (fileType) {
		case 'p':
			turl = 'https://api.telegram.org/bot' + ttoken + '/sendPhoto'
			formt.photo = res
			break;
		default:
			turl = 'https://api.telegram.org/bot' + ttoken + '/sendDocument'
			formt.document = res
	}

	request.post({
		url: turl,
		formData: formt,
		// form: tobody,
		maxAttempts: 1000,
		retryDelay: 100,
		retryStrategy: myRetryStrategy
	}, function (error, response, body) {
		console.log(body);
		(musics[link].json).push(body);
		qinsert(link);
		bot.sendDocument
		console.log(error);
	});

	// bot.sendPhoto(usertocken.slice(2), address).then(message => {
	// 	console.log(message.result.photo);
	// });
}
function uploading(usertocken, link, prop) {
		var address = new URL(musics[link].download[0]);
		console.log(address)
		var sendreq = (address.protocol == "http:") ? http : https;
			sendreq.get(address, function (res) {
				console.log(res.headers);
				prop.s = res.headers['content-length'];
				fileType = (res.headers['content-type'].includes("image")) ? 'p' : 'f';
			if (usertocken[0] == 's') {
				if (fileType == 'p') { fileType = 'IMAGE' } else { fileType = 'ATTACHMENT' }
				file_s(fileType, usertocken, res, stoken, prop,link);
			}
			else if (usertocken[0] == 't') {
				file_t(fileType, usertocken, res, prop,link)
			}
			else if (usertocken[0] == 'g') {
				if (fileType == 'p') { fileType = 'image' } else { fileType = 'file' }
				file_g(fileType, usertocken, res, prop,link);
			}
			else if (usertocken[0] == 'b') {
				if (fileType == 'p') { fileType = 'photo' } else { fileType = 'file' }
				data = [];
				res.on('data', function (chunk) {
					data.push(chunk);
				})
				res.on('end', function () {
					//at this point data is an array of Buffers
					//so Buffer.concat() can make us a new Buffer
					//of all of them together
					var buffer = Buffer.concat(data);
					wait_bale = [getbales(fileType, buffer.byteLength), 'getserver', usertocken, prop, buffer, fileType,link];
				});
			}
			else if (usertocken[0] == 'q') {
				if (fileType == 'p') { fileType = 'IMAGE' } else { fileType = 'ATTACHMENT' }
				file_s(fileType, usertocken, res, s2token, prop);
			}
		});
}
function doc_prop(fileType, plt, jsoncontent) {
	var prop = [];
	if (plt == 's') {
		prop.s = jsoncontent.fileSize;
		if (fileType == 'p') {
			prop.w = jsoncontent.imageWidth;
			prop.h = jsoncontent.imageHeight;
		}
		prop.n = jsoncontent.fileName;
	}
	else if (plt == 't') {

		if (fileType == 'p') {
			prop.s = (jsoncontent.photo[0]).file_size;
			prop.w = (jsoncontent.photo[0]).width;
			prop.h = (jsoncontent.photo[0]).height;
			prop.n = (jsoncontent.photo[0]).file_id + '.jpeg';
		}
		if (fileType == 'f') {
			prop.s = (jsoncontent.document).file_size;
			prop.w = (jsoncontent.document).width;
			prop.h = (jsoncontent.document).height;
			prop.n = (jsoncontent.document).file_name;
		}
		if (fileType == 'a') {
			prop.s = (jsoncontent.audio).file_size;
			prop.w = (jsoncontent.audio).width;
			prop.h = (jsoncontent.audio).height;
			prop.n = (jsoncontent.audio).file_id + '.mp3';
		}
		if (fileType == 'v') {
			prop.s = (jsoncontent.voice).file_size;
			prop.w = (jsoncontent.voice).width;
			prop.h = (jsoncontent.voice).height;
			prop.n = (jsoncontent.voice).file_id + '.mp3';
		}
		if (fileType == 'vn') {
			prop.s = (jsoncontent.video_note).file_size;
			prop.w = (jsoncontent.video_note).width;
			prop.h = (jsoncontent.video_note).height;
			prop.n = (jsoncontent.video_note).file_id + '.mp4';
		}
		if (fileType == 'c') {
			prop.s = (jsoncontent.video).file_size;
			prop.w = (jsoncontent.video).width;
			prop.h = (jsoncontent.video).height;
			prop.n = (jsoncontent.video).file_id + '.mp4';
		}
	}
	else if (plt == 'g') {
		prop.s = jsoncontent.filesize;
		if (fileType == 'p') {
			prop.w = jsoncontent.width;
			prop.h = jsoncontent.height;
		}
		prop.n = jsoncontent.filename;
	}
	else if (plt == 'b') {
		prop.s = jsoncontent.body.message.fileSize;
		if (fileType == 'p') {
			prop.w = jsoncontent.body.message.ext.width;
			prop.h = jsoncontent.body.message.ext.height;
		}
		prop.n = jsoncontent.body.message.name;
	}
	return prop
}
function gettelf(filetype, jsoncontent) {
	//console.log()
	var turl = ''
	switch (filetype) {
		case 'p':
			turl = ("https://api.telegram.org/bot" + ttoken + "/getFile?file_id=" + (jsoncontent.photo.reverse()[0]).file_id)
			break;
		case 'f':
			turl = ("https://api.telegram.org/bot" + ttoken + "/getFile?file_id=" + (jsoncontent.document).file_id)
			break;
		case 'a':
			turl = ("https://api.telegram.org/bot" + ttoken + "/getFile?file_id=" + (jsoncontent.audio).file_id)
			break;
		case 'v':
			turl = ("https://api.telegram.org/bot" + ttoken + "/getFile?file_id=" + (jsoncontent.voice).file_id)
			break;
		case 'vn':
			turl = ("https://api.telegram.org/bot" + ttoken + "/getFile?file_id=" + (jsoncontent.video_note).file_id)
			break;
		case 'c':
			turl = ("https://api.telegram.org/bot" + ttoken + "/getFile?file_id=" + (jsoncontent.video).file_id)
			break;
	}

	return new Promise(function (resolve, reject) {
		request({
			url: turl,
			method: "GET",
			json: true,
			maxAttempts: 50,
			retryDelay: 5000,
			retryStrategy: myRetryStrategy
		}, function (error, response, body) {
			//response.setEncoding('utf8');
			if (error) {
				console.log(error);
				reject(error)
			}
			resolve('https://api.telegram.org/file/bot' + ttoken + '/' + body.result.file_path)
		});
	});
}
function getbales(fileType, size) {
	var id = (Math.floor(Math.random() * 55000)).toString()
	socket.send(JSON.stringify(new baleserverjs(fileType, size, id)))
	return id;
}
function getbalef(fileType, fileId, userId) {
	var id = (Math.floor(Math.random() * 55000)).toString()
	socket.send(JSON.stringify(new baleurljs(fileType, fileId, userId, id)))
	return id;
}
//#endregion
//#region functions
//com_define : check if a usertocken id duplicated or not , if not added to tmp and db for future use.
function com_define(usertocken) {
	if (typeof tmp[usertocken] === 'undefined') {
		tmp[usertocken] = new tmpclass();
	}
}
function searching(string,usertocken){
    for (var ii = 0; ii < 1; ii++) {
    turlest=encodeURI("http://next1.ir/page/" + ii + "/?s=" + string);
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
                    down_link(link,usertocken);
                });
            }
            //console.log(musics)
            };
        });
    }
    }
//down_link
function down_link(link,usertocken) {
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
                musics[link].name.push(path.basename(downlink.pathname).replace('Next1.ir', '@RitmicBot').replace('www.', ''));
				musics[link].type.push($(this).children('div').text());
				var prop = [];
				prop.h='480';
				prop.w='480';
				prop.n=(musics[link].name)[0];
				uploading(usertocken,link, prop);
            });
            //console.log(musics);
			};
    });
}
//#endregion
//#region get object from mysql
//test change
// con.query(("SELECT link,titles,quality,type,download,name,json FROM ritmic.musics;"), function (err, result, fields) {
// 	if (result != "" && (typeof result !== 'undefined')) {
// 		result.forEach(function (element) {
// 			musics[element.link] = new mclass();
// 			musics[element.link].titles = element.titles;
// 			musics[element.link].quality = element.quality;
// 			musics[element.link].type = element.type;
// 			musics[element.link].download = element.download;
// 			musics[element.link].name = element.name;
// 			musics[element.link].json = element.json;
// 		});
// 	}
// });
function qinsert(link) {
	console.log(musics[link]);
	con.query(("INSERT INTO ritmic.musics (link,titles,quality,type,download,name,json) VALUES( '" + link + "','" + musics[link].titles + "','" + musics[link].quality + "','" + musics[link].type + "','" + musics[link].download + "','" + musics[link].name + "','" + musics[link].json + "');"), function (err, result, fields) {
		if (err) { console.log(err); }
	});
}
//#endregion
//#region on sorosh massage -------------------------------------------------------------------------------soroush------------------------------------------------------------
evtSource.onmessage = function(e) {
	var jsoncontent = JSON.parse(e.data);
	// console.log(jsoncontent);
	//definition objects
	var allowsend = 1;
	var usertocken = 's' + ',' + jsoncontent.from;
	com_define(usertocken);
	if (tmp[usertocken].wait != ''){
		smg(usertocken,waittitle,key.stop);
		allowsend = 0;
	}
	if ((jsoncontent.body) && (jsoncontent.body)[0] == "/") {
		//Back command
		if (jsoncontent.body == "/backcommand") {
			smg(usertocken,welcometitle,key.help);
			tmp[usertocken].wait = '';
			allowsend = 0;
		}
		else if (jsoncontent.body == "/help") {
			smg(usertocken,helptitle,key.stop);
			allowsend = 0;
		}
		else { allowsend = 1; }
	}
	//start bot
	if (jsoncontent.type == "START") {
		smg(usertocken,welcometitle,key.help);
		tmp[usertocken].wait = '';
		allowsend = 0;
	}
	//stop bot
	else if (jsoncontent.type == "STOP") {
		tmp[usertocken].wait = '';
		allowsend = 0;
	}
	//no command
	else if (allowsend == 1) {
		// send text to another user
		smg(usertocken,waittitle,key.stop);
		tmp[usertocken].wait = 'yes';
		searching(jsoncontent.body,usertocken)
	}
}
//#endregion
//#region on telegram -------------------------------------------------------------------------------------telegram------------------------------------------------------------
bot.on('message', jsoncontent => {
	//  console.log(jsoncontent);
	//definition objects
	var allowsend = 1;
	var usertocken = 't' + ',' + jsoncontent.chat.id;
	com_define(usertocken);
	if (tmp[usertocken].wait != '') {

	}
	if ((jsoncontent.text) && (jsoncontent.text)[0] == "✅") {
		if (jsoncontent.text == "✅بازگشت") {
			allowsend = 0; 
		}
		//help command
		else if (jsoncontent.text == "✅راهنما") {
			thecommand(usertocken, helptitle);
			allowsend = 0; 
		}
		else { allowsend = 1; }
	}
	//start bot
	if (jsoncontent.text == "/START") {
		com_run(usertocken);
		zeroobject(usertocken);
		tmp[usertocken].wait = '';
		allowsend = 0;
	}
	//no command
	else if (allowsend == 1) {
		smg(atmp[usertocken], jsoncontent, 't');
	}
});
// function callback(err, obj) {
// 	if (err) {
// 		// handle error
// 		console.log(err);
// 	}
// 	// handle returned object
// 	console.log(obj);
// };
// bot.startPolling(callback);
//#endregion
//#region on GAP --------------------------------------------------------------------------------------------GAP---------------------------------------------------------------
//massage sender gap function
function sendgap(usertocken, title, type, keyboard) {
	var tobody = {};
	tobody.chat_id = usertocken.slice(2);
	tobody.type = type;
	tobody.data = title;
	if (typeof keyboard === 'undefined') {
		//tobody.inline_keyboard = key.stop.gi;
	}
	else {
		tobody.reply_keyboard = keyboard;
	}
	request({
		url: "https://api.gap.im/sendMessage",
		method: "POST",
		headers: {
			"token": gtoken
		},
		json: true,
		form: tobody,
		maxAttempts: 1000,
		retryDelay: 100,
		retryStrategy: myRetryStrategy
	}, function (error, response, body) {
		console.log(body);
		console.log(response.attempts);
	});
}
//get post request from gap
app.post('/', function (req, res) {
	var allowsend = 1;
	var jsoncontent = req.body;
	var usertocken = 'g' + ',' + jsoncontent.chat_id;
	com_define(usertocken);
	if (tmp[usertocken].wait != '') {

	}
	if ((jsoncontent.data) && (jsoncontent.data)[0] == "/") {
		//help command
		if (jsoncontent.data == "/help") {
			thecommand(usertocken, helptitle);
			allowsend = 0;
		}
		else { allowsend = 1; }
	}
	//start bot
	if (jsoncontent.type == "join") {
		allowsend = 0;
	}
	//stop bot
	else if (jsoncontent.type == "leave") {
		allowsend = 0;
	}
	else if (jsoncontent.type == "triggerButton") {
		allowsend = 0;
	}
	//no command
	else if (allowsend == 1) {
			smg(atmp[usertocken], jsoncontent, 'g');
	}
});
//start listener
//test change
var server = app.listen(930, function () {
	var host = server.address().address;
	var port = server.address().port;
});
//#endregion
//#region on newBale -------------------------------------------------------------------------------------------newBale-------------------------------------------------------------
// function sendbale(text, usertocken, keyboard) {
// 	var templateMessage = new balejs(text, usertocken, key.stop.b);
// 	if (typeof keyboard !== 'undefined') {
// 		templateMessage = new balejs(text, usertocken, keyboard);
// 	}
// 	socket.send(JSON.stringify(templateMessage));
// }
// socket.addEventListener('message', (e) => {

// 	// var jsoncontent = JSON.parse(e.data);
// 	// //  console.log(jsoncontent);
// 	// if (jsoncontent.body.$type == 'Message') {

// 	// 	// console.log(jsoncontent.body.message.caption);	
// 	// 	var allowsend = 0;
// 	// 	var usertocken = 'b' + ',' + jsoncontent.body.peer.id + '|' + jsoncontent.body.peer.accessHash;
// 	// 	com_define(usertocken);
// 	// 	if (tmp[usertocken].wait != '') {

// 	// 	}
// 	// 	if (jsoncontent.body.message.$type == "TemplateMessageResponse") {
// 	// 		//Back command
// 	// 		if (jsoncontent.body.message.textMessage == "/backcommand") {
// 	// 			com_run(usertocken);
// 	// 			zeroobject(usertocken);
// 	// 		}
// 	// 		//help command
// 	// 		else if (jsoncontent.body.message.textMessage == "/help") {
// 	// 			thecommand(usertocken, helptitle);
// 	// 		}
// 	// 		//stop bot
// 	// 		else if (jsoncontent.body.message.textMessage == "/stop") {
// 	// 		}
// 	// 		//start bot
// 	// 		else if (jsoncontent.body.message.textMessage == '/start') {

// 	// 		}
// 	// 		else { allowsend = 1; }
// 	// 	}

// 	// 	if (allowsend == 1) {
// 	// 			smg(atmp[usertocken], jsoncontent, 'b');
// 	// 		}
// 	// }
// 	// else if (jsoncontent.$type == 'Response') {
// 	// 	console.log(jsoncontent.body.url);
// 	// 	if (wait_bale[0] == jsoncontent.id) {
// 	// 		if (wait_bale[1] == 'geturl') {
// 	// 			uploading( wait_bale[2], jsoncontent.body.url, wait_bale[3],wait_bale[4]);
// 	// 		}
// 	// 		else if (wait_bale[1] == 'getserver') {
// 	// 			file_b(jsoncontent.body.url, wait_bale[2], jsoncontent.body.fileId, jsoncontent.body.userId, wait_bale[3], wait_bale[4], wait_bale[5],wait_bale[6]);
// 	// 		}
// 	// 	}
// 	// }
// });
//#endregion

bale2.all('/*', function (request, res, next) {
	console.log(request.method);
    console.log(request.headers);
    console.log(request.url);
	next() // pass control to the next handler
})

bale2.get('/', function(req, res) {
	// res.send('hello world')
	var jsoncontent = req.body;
	console.log(jsoncontent);
})

bale2.post(`/bot`, (req, res) => {
	console.log(req.body);
	res.sendStatus(200);
});

const tlsOptions = {
	key: fs.readFileSync('/root/node/musicbot/cert/YOURPRIVATE.key'),
	cert: fs.readFileSync('/root/node/musicbot/cert/YOURPUBLIC.pem'),
	// ca: [
	// 	// This is necessary only if the client uses the self-signed certificate.
	// 	fs.readFileSync('/root/node/cert/ca-crt.pem')
	// ],
	//passphrase: 'pass:password'
	}


https.createServer(tlsOptions, bale2)
.listen(443, function () {
	console.log('Example app listening on port 3000! Go to https://localhost:3000/')
});



