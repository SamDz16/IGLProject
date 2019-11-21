var express = require('express');
var server = express();
var path = require('path');
var bodyParser = require('body-parser');
const MongoClient = require ('mongodb').MongoClient; 

MongoClient.connect ('mongodb://localhost:27017', (err,client)=>{
	console.log('connected to mongo'); 
	let db=client.db('demande'); 
	client.close();
});
server.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'interface', 'Etudiant.html'));
});

server.post('/Etudiant', bodyParser.urlencoded({ extend: true }), (req, res, next) => {
	res.send(req.body);
});
server.listen(7000,'127.0.0.1');
	console.log('The server is listening ...');
