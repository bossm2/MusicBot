//#region variables
const { btoken, stoken, s2token, ttoken, welcometitle, canceltitle, blocktitle, counttitle, waittitle, starttitle, notsupportsmg, gtoken, settingtitle, isreptitle, isbloctitle, helptitle,key } = require("./Constant.js");
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
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var wait_bale = [];
var musics = [];
var tmp = {};
var atmp = {};
var queue = new Set();
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
const RECONNECTING_OPTIONS = {
	connectionTimeout: 5000,
	constructor: typeof window !== 'undefined' ? WebSocket : NodeWebSocket,
	debug: true,
	maxReconnectionDelay: 4000,
	maxRetries: Infinity,
	minReconnectionDelay: 10,
	reconnectionDelayGrowFactor: 1.3,
};
RECONNECTING_OPTIONS.WebSocket = require('ws');
const socket = new ReconnectingWebsocket(
	() => btoken,
	undefined,
	RECONNECTING_OPTIONS
);
socket.addEventListener('open', () => {
	console.log('connected');
});
socket.addEventListener('close', (e) => {
	console.log(e);
});
socket.addEventListener('error', (e) => {
	console.log(e);
});
var evtSource = new EventSource((stoken + "/getMessage"), { Header: { "Content-Type": "application/stream+json", "Accept": "application/stream+json", 'Connection': 'keep-alive' } });
const Slimbot = require('slimbot');
const bot = new Slimbot(ttoken);
evtSource.onerror = function (err) {
	if (err) console.log(err);
}
//conection string mysql
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "!@#123qweQWE",
	database: "chat2",
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
		if (usertocken[0] == 's') {
			sendMessage(usertocken, textsmg, 'TEXT',keyboard);
		}
		else if (usertocken[0] == 'g') {
			sendgap(usertocken, textsmg, 'text',keyboard);
		}
		else if (usertocken[0] == 't') {
			bot.sendMessage(usertocken.slice(2), textsmg);
		}
		else if (usertocken[0] == 'b') {
			sendbale(textsmg, usertocken,keyboard);
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
//massage sender function
function sendMessage2(usertocken, title, type, keyboard) {
	request({
		url: (s2token + "/sendMessage"),
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
function file_s(fileType, usertocken, res, url, prop) {
	// console.log(fileType);
	// console.log(usertocken);
	// console.log(url);
	request.post({
		url: url + '/uploadFile',
		formData: {
			file: res
		},
	}, function (error, response, body) {
		console.log(error);
		console.log(body);
		//console.log(response);
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
			console.log(body2);
		});
	});
}
function file_g(fileType, usertocken, res, prop) {

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
function file_b(server, usertocken, fileId, accessHash, prop, buffer, fileType) {
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
		}
		else {
			socket.send(JSON.stringify(new balesend_doc(fileId, accessHash, buffer.byteLength, usertocken, prop)));
		}

	});
}
function file_t(fileType, usertocken, res, prop) {
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
		bot.sendDocument
		console.log(error);
	});

	// bot.sendPhoto(usertocken.slice(2), address).then(message => {
	// 	console.log(message.result.photo);
	// });
}
function uploading(usertocken, link, prop,fileType) {
		var link = new URL(link);
		console.log(link)
		var sendreq = (link.protocol == "http:") ? http : https;
			sendreq.get(link, function (res) {
				console.log(res.headers);
				prop.s = res.headers['content-length'];
				fileType = (res.headers['content-type'].includes("image")) ? 'p' : 'f';
			if (usertocken[0] == 's') {
				if (fileType == 'p') { fileType = 'IMAGE' } else { fileType = 'ATTACHMENT' }
				file_s(fileType, usertocken, res, stoken, prop);
			}
			else if (usertocken[0] == 't') {
				file_t(fileType, usertocken, res, prop)
			}
			else if (usertocken[0] == 'g') {
				if (fileType == 'p') { fileType = 'image' } else { fileType = 'file' }
				file_g(fileType, usertocken, res, prop);
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
					wait_bale = [getbales(fileType, buffer.byteLength), 'getserver', usertocken, prop, buffer, fileType];
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
    for (var ii = 0; ii < 20; ii++) {
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
                    down_link(link);
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
                musics[link].name.push(path.basename(downlink.pathname).replace('Next1.ir', '@bott').replace('www.', ''));
				musics[link].type.push($(this).children('div').text());
				var prop = [];
				prop.h='480';
				prop.w='480';
				prop.n=musics[link].name;
            });
            console.log(musics);
			};
    });
}
//#endregion
//#region get object from mysql
//test change
con.query(("SELECT UserID,State,Block FROM chat3.UserProp;"), function (err, result, fields) {
	if (result != "" && (typeof result !== 'undefined')) {
		result.forEach(function (element) {
			tmp[element.UserID] = new tmpclass();
			//tmp[element.UserID].state = element.State;
			//tmp[element.UserID].bloc = element.Block || '';
		});
	}
});
function qblock(usertocken) {
	con.query(("UPDATE chat3.UserProp SET Block = '" + tmp[usertocken].bloc + "' where UserID =  '" + usertocken + "';"), function (err, result, fields) {
		if (err) { console.log(err); }
	});
}
function qhistory(usertocken1, usertocken2) {
	con.query(("UPDATE chat3.UserProp SET History = CONCAT(History,'" + '||' + usertocken2 + "') where UserID = '" + usertocken1 + "';UPDATE chat3.UserProp SET History = CONCAT(History,'" + '||' + usertocken1 + "') where UserID = '" + usertocken2 + "';"), function (err, result, fields) {
		if (err) { console.log(err); }
	});
}
function qstate(usertocken, state) {
	con.query(("UPDATE chat3.UserProp SET State = '" + state + "' where UserID = '" + usertocken + "';"), function (err, result, fields) {
		if (err) { console.log(err); }
	});
}
function qinsert(usertocken) {
	con.query(("INSERT INTO chat3.UserProp (UserID) VALUES( '" + usertocken + "');"), function (err, result, fields) {
		if (err) { console.log(err); }
	});
}
//#endregion
//#region on sorosh massage -------------------------------------------------------------------------------soroush------------------------------------------------------------
evtSource.onmessage = function (e) {
	var jsoncontent = JSON.parse(e.data);
	// console.log(jsoncontent);
	//definition objects
	var allowsend = 1;
	var usertocken = 's' + ',' + jsoncontent.from;
	com_define(usertocken);
	if (tmp[usertocken].wait != '') {

		if (jsoncontent.body == "/yes") {
			acceptdoing(usertocken);
		}
		else if (jsoncontent.body == "/no") {
			tmp[usertocken].wait = '';
		}
		// else{
		//	jsoncontent.body = tmp[usertocken].wait;
		// }
	}
	if ((jsoncontent.body) && (jsoncontent.body)[0] == "/") {
		//run the game
		if (jsoncontent.body == "/runcommand") {
			runcommands(usertocken);
			var allowsend = 0;
		}
		//Back command
		else if (jsoncontent.body == "/backcommand") {
			com_run(usertocken);
			zeroobject(usertocken);
			var allowsend = 0;
		}
		//se
		else if (jsoncontent.body == "/setting") {
			thesetting(usertocken, settingtitle);
			var allowsend = 0;
		}
		else if (jsoncontent.body == "/report") {
			theblock(usertocken, isreptitle);
			tmp[usertocken].wait = '/report';
			var allowsend = 0;
		}
		else if (jsoncontent.body == "/blocking") {
			theblock(usertocken, isbloctitle);
			tmp[usertocken].wait = '/blocking'
			var allowsend = 0;
		}
		else if (jsoncontent.body == "/help") {
			thecommand(usertocken, helptitle);
			var allowsend = 0;
		}
		else { allowsend = 1; }
		// else if(jsoncontent.body == "/yes" || jsoncontent.body == "/no"){}
	}
	
	//start bot
	if (jsoncontent.type == "START") {
		com_run(usertocken);
		zeroobject(usertocken);
		tmp[usertocken].wait = '';
	}
	//stop bot
	else if (jsoncontent.type == "STOP") {
		zeroobject(usertocken);
	}
	//no command
	else if (allowsend == 1) {
		// send text to another user
		if (typeof atmp[usertocken] == 'undefined' || !(atmp[usertocken])) {
			com_run(usertocken);
			zeroobject(usertocken);
		}
		else if ((atmp[usertocken])[0] == 's' || (atmp[usertocken])[0] == 'q') {
			jsoncontent.to = atmp[usertocken].slice(2);
			if (atmp[usertocken][0] == 's') {
				var token = stoken
			}
			else {
				var token = s2token
			}
			request({
				url: (token + "/sendMessage"),
				method: "POST",
				headers: {
					"Content-Type": "Application/json",
					"Accept": "Application/json"
				},
				json: true,
				body: jsoncontent,
				maxAttempts: 1000,
				retryDelay: 100,
				retryStrategy: myRetryStrategy
			}, function (error, response, body) {
				console.log(body);
				console.log(response.attempts);
			});
			jsoncontent.from = usertocken;
			jsoncontent.to = atmp[usertocken];
			smg_log(jsoncontent);
		}
		else {
			smg(atmp[usertocken], jsoncontent, 's')
		}
	}
}
//#endregion
//#region on telegram -------------------------------------------------------------------------------------telegram------------------------------------------------------------
bot.on('message', jsoncontent => {
	//  console.log(jsoncontent);
	//definition objects
	var allowsend = 0;
	var usertocken = 't' + ',' + jsoncontent.chat.id;
	com_define(usertocken);
	if (tmp[usertocken].wait != '') {
		if (jsoncontent.text == "✅بله") {
			acceptdoing(usertocken);
		}
		else if (jsoncontent.text == "✅خیر") {
			tmp[usertocken].wait = '';
		}
		// else{
		//	jsoncontent.text = tmp[usertocken].wait;
		// }
	}
	if ((jsoncontent.text) && (jsoncontent.text)[0] == "✅") {
		//run the game
		if (jsoncontent.text == '✅شروع چت تصادفی' || jsoncontent.text == "✅چت جدید") {
			runcommands(usertocken);
		}
		//Back command
		else if (jsoncontent.text == "✅بازگشت") {
			com_run(usertocken);
			zeroobject(usertocken);
		}
		//setting command
		else if (jsoncontent.text == "✅تنظیمات و راهنما") {
			thesetting(usertocken, settingtitle);
		}
		//blocking command
		else if (jsoncontent.text == "✅بلاک کردن") {
			theblock(usertocken, isbloctitle);
			tmp[usertocken].wait = '/blocking'
		}
		else if (jsoncontent.text == "✅بلاک و گزارش تخلف") {
			theblock(usertocken, isreptitle);
			tmp[usertocken].wait = '/report'
		}
		//help command
		else if (jsoncontent.text == "✅راهنما") {
			thecommand(usertocken, helptitle);
		}
		else { allowsend = 1; }
		// else if(jsoncontent.text == "✅بله" || jsoncontent.text == "✅خیر"){}
	}
	else { allowsend = 1; }
	//start bot
	if (jsoncontent.text == "/START") {
		com_run(usertocken);
		zeroobject(usertocken);
		tmp[usertocken].wait = '';
	}
	//no command
	else if (allowsend == 1) {
		// send text to another user
		if (typeof atmp[usertocken] == 'undefined' || !(atmp[usertocken])) {
			com_run(usertocken);
			zeroobject(usertocken);
		}
		else {
			smg(atmp[usertocken], jsoncontent, 't');
		}
	}
});
function callback(err, obj) {
	if (err) {
		// handle error
		console.log(err);
	}
	// handle returned object
	console.log(obj);
};
bot.startPolling(callback);
//#endregion
//#region on GAP --------------------------------------------------------------------------------------------GAP---------------------------------------------------------------
//massage sender gap function
function sendgap(usertocken, title, type, keyboard) {
	var tobody = {};
	tobody.chat_id = usertocken.slice(2);
	tobody.type = type;
	tobody.data = title;
	if (typeof keyboard === 'undefined') {
		tobody.inline_keyboard = key.stop.gi;
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
	var allowsend = 0;
	var jsoncontent = req.body;
	//  console.log(jsoncontent);
	// console.log((JSON.parse(jsoncontent.data)).path);
	//definition objects
	var usertocken = 'g' + ',' + jsoncontent.chat_id;
	com_define(usertocken);
	if (tmp[usertocken].wait != '') {
		if (jsoncontent.data == "/yes") {
			acceptdoing(usertocken);
		}
		else if (jsoncontent.data == "/no") {
			tmp[usertocken].wait = '';
		}
		// else{allowsend = 0}
		//	jsoncontent.body = tmp[usertocken].wait;
	}
	if ((jsoncontent.data) && (jsoncontent.data)[0] == "/") {
		//run the game
		if (jsoncontent.data == "/runcommand") {
			runcommands(usertocken);
		}
		//Back command
		else if (jsoncontent.data == "/backcommand") {
			com_run(usertocken);
			zeroobject(usertocken);
		}
		//setting command
		else if (jsoncontent.data == "/setting") {
			thesetting(usertocken, settingtitle);
		}
		//blocking command
		else if (jsoncontent.data == "/blocking") {
			theblock(usertocken, isbloctitle);
			tmp[usertocken].wait = '/blocking'
		}
		else if (jsoncontent.data == "/report") {
			theblock(usertocken, isreptitle);
			tmp[usertocken].wait = '/report'
		}
		//help command
		else if (jsoncontent.data == "/help") {
			thecommand(usertocken, helptitle);
		}
		// else if(jsoncontent.data == "/yes" || jsoncontent.data == "/no"){}
		else { allowsend = 1; }
	}
	else { allowsend = 1; }
	//start bot
	if (jsoncontent.type == "join") {
		com_run(usertocken);
		zeroobject(usertocken);
	}
	//stop bot
	else if (jsoncontent.type == "leave") {
		zeroobject(usertocken)
	}
	//Back command
	// else if(jsoncontent.data == "backcommand"){
	// com_run(usertocken);
	// zeroobject(usertocken)
	// }
	else if (jsoncontent.type == "triggerButton") {
		com_run(usertocken);
		zeroobject(usertocken)
	}
	//no command
	else if (allowsend == 1) {
		// send text to another user
		if (typeof atmp[usertocken] == 'undefined' || !(atmp[usertocken])) {
			com_run(usertocken);
			zeroobject(usertocken);
		}
		else if ((atmp[usertocken])[0] == 'g') {
			jsoncontent.chat_id = atmp[usertocken].slice(2);
			//jsoncontent.reply_keyboard = '{"keyboard":[[{"runcommand": "✅چت جدید"},{"backcommand":"✅بازگشت"}]],"once":false}';
			jsoncontent.inline_keyboard = '[[{"text": "انصراف" , "cb_data": "backcommand"}]]';
			request({
				url: "https://api.gap.im/sendMessage",
				method: "POST",
				headers: {
					"token": gtoken
				},
				json: true,
				form: jsoncontent,
				maxAttempts: 1000,
				retryDelay: 100,
				retryStrategy: myRetryStrategy
			}, function (error, response, body) {
				console.log(body);
				console.log(response.attempts);
			});
			jsoncontent.from = usertocken;
			jsoncontent.to = atmp[usertocken];
			smg_log(jsoncontent);
		}
		else {
			smg(atmp[usertocken], jsoncontent, 'g');
		}
	}
});
//start listener
//test change
var server = app.listen(801, function () {
	var host = server.address().address;
	var port = server.address().port;
});
//#endregion
//#region on newBale -------------------------------------------------------------------------------------------newBale-------------------------------------------------------------
function sendbale(text, usertocken, keyboard) {
	var templateMessage = new balejs(text, usertocken, key.stop.b);
	if (typeof keyboard !== 'undefined') {
		templateMessage = new balejs(text, usertocken, keyboard);
	}
	socket.send(JSON.stringify(templateMessage));
}
socket.addEventListener('message', (e) => {
	var jsoncontent = JSON.parse(e.data);
	//  console.log(jsoncontent);
	if (jsoncontent.body.$type == 'Message') {

		// console.log(jsoncontent.body.message.caption);	
		var allowsend = 0;
		var usertocken = 'b' + ',' + jsoncontent.body.peer.id + '|' + jsoncontent.body.peer.accessHash;
		com_define(usertocken);
		if (tmp[usertocken].wait != '') {
			if (jsoncontent.body.message.textMessage == "/yes") {
				acceptdoing(usertocken);
			}
			else if (jsoncontent.body.message.textMessage == "/no") {
				tmp[usertocken].wait = '';
			}
			// else{
			// jsoncontent.body = tmp[usertocken].wait;
			// allowsend = 1
			// }
		}
		if (jsoncontent.body.message.$type == "TemplateMessageResponse") {

			//run the game
			if (jsoncontent.body.message.textMessage == "/runcommand") {
				runcommands(usertocken);
			}
			//Back command
			else if (jsoncontent.body.message.textMessage == "/backcommand") {
				com_run(usertocken);
				zeroobject(usertocken);
			}
			//setting command
			else if (jsoncontent.body.message.textMessage == "/setting") {
				thesetting(usertocken, settingtitle);
			}
			//blocking command
			else if (jsoncontent.body.message.textMessage == "/blocking") {
				theblock(usertocken, isbloctitle);
				tmp[usertocken].wait = '/blocking'
			}
			else if (jsoncontent.body.message.textMessage == "/report") {
				theblock(usertocken, isreptitle);
				tmp[usertocken].wait = '/report'
			}
			//help command
			else if (jsoncontent.body.message.textMessage == "/help") {
				thecommand(usertocken, helptitle);
			}
			//stop bot
			else if (jsoncontent.body.message.textMessage == "/stop") {
				zeroobject(usertocken)
			}
			//start bot
			else if (jsoncontent.body.message.textMessage == '/start') {
				com_run(usertocken);
				zeroobject(usertocken);
			}
			else { allowsend = 1; }
			// else if(jsoncontent.body.message.text == '/yes' || jsoncontent.body.message.text == '/no'){}
		}
		else { allowsend = 1; }
		//no command
		// send text to another user

		if (allowsend == 1) {
			if (typeof atmp[usertocken] == 'undefined' || !(atmp[usertocken])) {
				com_run(usertocken);
				zeroobject(usertocken);
			}
			else if ((atmp[usertocken])[0] == 'b') {
				var x = (atmp[usertocken]).slice(2).split('|');
				jsoncontent.body.peer.id = x[0];
				jsoncontent.body.peer.accessHash = x[1];
				jsoncontent.$type = 'Request';
				jsoncontent.body.$type = 'SendMessage';
				jsoncontent.service = "messaging";
				jsoncontent.id = "0";
				jsoncontent.body.quotedMessage = null;
				jsoncontent.body.randomId = (Math.floor(Math.random() * 1800000).toString() + Math.floor(Math.random() * 4000000).toString() + Math.floor(Math.random() * 55000).toString());
				jsoncontent.body.message.generalMessage = JSON.parse(JSON.stringify(jsoncontent.body.message));
				jsoncontent.body.message.templateMessageId = '0';
				jsoncontent.body.message.$type = "TemplateMessage";
				jsoncontent.body.message.btnList = key.stop.b;
				socket.send(JSON.stringify(jsoncontent));
				// console.log(JSON.stringify(jsoncontent))
				jsoncontent.from = usertocken;
				jsoncontent.to = atmp[usertocken];
				smg_log(jsoncontent);
			}
			else {
				smg(atmp[usertocken], jsoncontent, 'b');
			}
		}
	}
	else if (jsoncontent.$type == 'Response') {
		console.log(jsoncontent.body.url);
		if (wait_bale[0] == jsoncontent.id) {
			if (wait_bale[1] == 'geturl') {
				uploading( wait_bale[2], jsoncontent.body.url, wait_bale[3],wait_bale[4]);
			}
			else if (wait_bale[1] == 'getserver') {
				file_b(jsoncontent.body.url, wait_bale[2], jsoncontent.body.fileId, jsoncontent.body.userId, wait_bale[3], wait_bale[4], wait_bale[5]);
			}
		}
	}
});
//#endregion