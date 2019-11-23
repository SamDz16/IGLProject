//Requirements
var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

//Uses
server.use('/assets', express.static('./assets'));
//server.use(bodyParser.urlencoded({ extend: true }));

//View Engine - EJS
server.set('view engine', 'ejs');

//Routers
server.get('/', function(req, res) {
	res.render('choixUtilisateur');
});

server.post('/', bodyParser.urlencoded({ extend: true }), (req, res) => {
	var choice = req.body;
	if (choice.admin == 'on') {
		//** Something to develop**//
	} else {
		res.redirect('/student');
	}
});

server.get('/student', function(req, res) {
	res.render('Etudiant');
});

server.post('/student', bodyParser.urlencoded({ extend: true }), (req, res) => {
	MongoClient.connect('mongodb://localhost:27017/IGL', (err, client) => {
		console.log('connected to mongo');
		const db = client.db('StudentsRequests');
		db
			.collection('Request')
			.insertOne({
				Nom: req.body.nom,
				Prenom: req.body.prenom,
				Matricule: req.body.matricule,
				Email: req.body.email,
				GroupeA: +req.body.grA,
				GroupeV: +req.body.grV
			})
			.then((result) => {
				res.redirect('/');
			});

		client.close();
	});
});

server.listen(7000, () => {
	console.log('The server is listening on port 7000 ...');
});


// For Unit Tests
module.exports = {
	sayTestsAreWorking: function(){
		return "Tests are working";
	},
	addNumbers: function(number1, number2){
		return number1 + number2;
	}
}