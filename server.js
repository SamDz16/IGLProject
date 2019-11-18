var express = require('express');
var server = express();
var path = require('path');
var bodyParser = require('body-parser');

server.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'interface', 'Etudiant.html'));
});

server.post('/Etudiant', bodyParser.urlencoded({ extend: true }), (req, res, next) => {
	res.send(req.body);
});
server.listen(7000, () => {
	console.log('The server is listening ...');
});
