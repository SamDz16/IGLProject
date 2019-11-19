//Requirements
var express = require('express');
var server = express();
var bodyParser = require('body-parser');

//Uses
server.use('/assets', express.static('public'));
server.use(bodyParser.urlencoded({ extend: true }));
server.use(bodyParser.json);

//View Engine - EJS
server.set('view engine', 'ejs');

//Routers
server.get('/', function(req, res) {
	res.render('choixUtilisateur.ejs');
});

server.post('/', (req, res, next) => {
	console.log(req.body);
});

//Listening to port
server.listen(7000, () => {
	console.log('The server is listening ...');
});
