var express = require('express');
var server = express();
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

//View Engine - EJS
server.set('view engine', 'ejs');

//Uses
server.use('/assets', express.static('./assets'));

//Routers
server.get('/', function(req, res, next) {
	res.render('choixUtilisateur');
});

server.post('/', bodyParser.urlencoded({ extend: true }), (req, res) => {
	var choice = req.body;
	if (choice.admin == 'on') {
		res.redirect('/admin');
	} else {
		res.redirect('/etudiant');
	}
});

server.get('/etudiant', function(req, res) {
	res.render('Etudiant');
});

server.post('/etudiant', bodyParser.urlencoded({ extend: true }), (req, res, next) => {
	MongoClient.connect('mongodb://localhost:27017/IGL', (err, client) => {
		console.log('connected to mongo');
		const db = client.db();
		db
			.collection('demande')
			.updateOne(
				{ email: req.body.email },
				{
					$set: {
						nom: req.body.nom,
						prenom: req.body.prenom,
						matricule: req.body.matricule,
						groupeA: +req.body.grA,
						groupeV: +req.body.grV
					}
				},
				{ upsert: true }
			)
			.then((result) => {
				console.log('votre demande a été enregistré');

				res.redirect('/');
			});

		client.close();
	});
});

server.post('/Consultation', function(req, res, next) {
	MongoClient.connect('mongodb://localhost:27017/IGL', (err, client) => {
		console.log('connected to mongo');
		const db = client.db();
		db.collection('demande').find().toArray().then((demande) => {
			console.log(demande);
			res.render('Consultation', {
				demande: demande // res.send (demande)
			}); // quand il clique sur le button consulter
		});
		client.close();
	});
});

//La partie admin
server.get('/admin', function(req, res, next) {
	res.render('admin');
});

//La partie serveur
server.listen(3001, '127.0.0.1');
console.log('The server is listening ...');
