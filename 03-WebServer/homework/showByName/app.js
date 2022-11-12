var http = require('http');
var fs   = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');

// var filenames = [arcoiris, badboy, code, resaca, retrato, sexy].map(function (n) {
//     return  n + '_doge.jpg';
//   });

function readFile(filename){
return new Promise((resolve,rejects)=>{
	fs.readFile('./images/' + filename + '.jpg', (err,data)=>{
		if(err)rejects({
			data: '<h1>No encontrado<h1>',
			type:"text/html",
			status:404
		})
		else resolve({
			data,
			type:'image/jpg',
			status:200	
		})
	})
})
}

http.createServer( function(req, res){ 
readFile(req.url.split('/',2).pop())
.then((img)=>{
	res.writeHead(img.status,{'type':img.type})
	return res.end(img.data)
})
.catch((err)=>{
	res.writeHead(err.status,{'type':err.type})
	return res.end(err.data)
})

}).listen(1337, '127.0.0.1');

