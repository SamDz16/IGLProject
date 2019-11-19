//Requirements
var express = require('express');
var server = express();
var bodyParser = require('body-parser');

//Uses
server.use('/assets', express.static('./assets'));
server.use(bodyParser.urlencoded({ extend: true }));
//server.use(bodyParser.json);

//View Engine - EJS
server.set('view engine', 'ejs');

//Routers
server.get('/', function(req, res) {
	res.render('choixUtilisateur');
});

server.post('/', (req, res, next) => {
	var choice = req.body;
	if (choice.admin == 'on') {
		//** Something to develop**//
	} else {
		res.redirect('student');
	}
});

server.get('/student', function(req, res) {
	res.render('Etudiant');
});
//Listening to port
server.listen(7000, () => {
	console.log('The server is listening ...');
});
