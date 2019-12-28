var express = require('express');
var server = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Astudent = require('./models/student');
mongoose.set('useFindAndModify', false);
const MongoClient = require('mongodb').MongoClient;
module.exports = server

//View Engine - EJS
server.set('view engine', 'ejs');

//Uses
server.use('/assets', express.static('./assets'));

//Routers
server.get('/', function (req, res, next) {
	res.render('choixUtilisateur');
});

server.post('/', bodyParser.urlencoded({
	extend: true
}), (req, res) => {
	var choice = req.body;
	if (choice.admin == 'on') {
		res.redirect('/admin');
	} else {
		res.redirect('/etudiant');
	}
});

server.get('/etudiant', function (req, res) {
	res.render('Etudiant');
});

server.post('/etudiant', bodyParser.urlencoded({
	extend: true
}), (req, res, next) => {

	//Connect to database
	mongoose.connect('mongodb://localhost:27017/PERMUTATION', {
		useUnifiedTopology: true,
		useNewUrlParser: true
	});

	//Testing the connection to the database
	mongoose.connection.once('open', () => {
		console.log("Connected to the database");

		var student = new Astudent({
			nom: req.body.nom,
			prenom: req.body.prenom,
			matricule: req.body.matricule,
			email: req.body.email,
			groupeA: parseInt(req.body.grA),
			groupeV: parseInt(req.body.grV)
		});
		if (student.groupeA != student.groupeV) {
			Astudent.findOne({
				matricule: student.matricule,
			}).then(function (result) {
				if (result === null) {

					//The student doesn't exist in the database
					student
						.save()
						.then(() => {
							console.log('The student is added to the database');
						})
				} else {
					console.log(req.body)
					console.log(result)
					// The matricule is the same => the student exists & result =! null
					//The student is going to be updated !
					Astudent.findOneAndUpdate({
						nom: result.nom,
						prenom: result.prenom,
						email: result.email,
						groupeA: result.groupeA,
						groupeV: result.groupeV,
					}, {
						nom: req.body.nom,
						prenom: req.body.prenom,
						email: req.body.email,
						groupeA: parseInt(req.body.grA),
						groupeV: parseInt(req.body.grV)
					}).then(() => {
						console.log('The student has been successfully updated !')
					})
				}
			})
		} else {
			console.log('You entered the same groupe !')
		}
		res.redirect('/');
	}).on('error', (error) => {
		console.log('Error while connecting to the database : ', error);
	})
})

server.post('/Consultation', function (req, res, next) {
	MongoClient.connect('mongodb://localhost:27017/PERMUTATION', (err, client) => {
		console.log('connected to mongo');
		const db = client.db();
		db.collection('requests').find().toArray().then((demande) => {
			console.log(demande);
			res.render('Consultation', {
				demande: demande // res.send (demande)
			}); // Quand il clique sur le button consulter
		});
		client.close();
	});
});

//La partie admin
server.get('/admin', function (req, res, next) {
	res.render('admin');
});

//La partie serveur
server.listen(7000, () => {
	console.log('The server is listening ...');
});