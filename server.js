//Requires
var express = require('express');
var server = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Astudent = require('./models/student');
const functionPermuter = require('./function/permuter');
const MongoClient = require('mongodb').MongoClient;

//View Engine - EJS
server.set('view engine', 'ejs');

//Uses
server.use('/assets', express.static('./assets'));

//Routers
server.get('/', function (req, res, next) {

	res.render('choixUtilisateur');

});

server.post('/', bodyParser.urlencoded({
	extended: true
}), (req, res) => {
	var choice = req.body;
	if (choice.admin == 'on') {
		res.redirect('/admin');
	} else {
		if (choice.student == 'on') {
			res.redirect('/etudiant');
		} else {
			res.redirect('/');
		}
	}
});

server.get('/etudiant', function (req, res) {
	res.render('Etudiant');
});

server.post('/etudiant', bodyParser.urlencoded({
	extended: true
}), (req, res, next) => {

	//Connect to database
	mongoose.connect('mongodb://localhost:27017/PERMUTATION', {
		useUnifiedTopology: true,
		useNewUrlParser: true
	});

	//Testing the connection to the database
	mongoose.connection.once('open', () => {
		/**
		 * Student information
		 * @type {object} 
		 */
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

							console.log('The student : ' + student.nom + ' has been added to the database successfully');

							Astudent.countDocuments({}, function (err, numberDoc) {

								var numberDocCopy = numberDoc;
								if (numberDocCopy >= 2) {

									console.log('\n\nLaunching the permutation function ...');
									functionPermuter();

								} else {
									if (numberDocCopy == 0) {
										console.log("The database is empty !")
									} else {
										//numberDocCopy == 1
										console.log('There is just one student in the database')
									}
								}
							})
						})
				} else {

					// The matricule is the same => the student exists
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
			console.log('You entered the same group !')
		}
		res.redirect('/');
	}).on('error', (error) => {
		console.log('Error while connecting to the database : ', error);
	})
})


server.get('/Consultation', function (req, res, next) {
	MongoClient.connect('mongodb://localhost:27017/PERMUTATION', {
		useUnifiedTopology: true
	}, (err, client) => {
		// console.log('connected to mongo');
		const db = client.db();
		db.collection('requests').find().toArray().then((demande) => {
			// console.log(demande);
			res.render('Consultation', {
				demande: demande
			});
		});
		client.close();
	});
});
/** 
 * @module Consultation */
/** see {@tutorial Consultation_tuto }
 */

server.post('/Consultation', function (req, res, next) {
	MongoClient.connect('mongodb://localhost:27017/PERMUTATION', {
		useUnifiedTopology: true
	}, (err, client) => {
		// console.log('connected to mongo');
		const db = client.db();
		db.collection('requests').find().toArray().then((demande) => {
			// console.log(demande);
			res.render('Consultation', {
				demande: demande
			});
		});
		client.close();
	});
});

//Admin part
server.get('/admin', function (req, res, next) {
	res.render('admin')
});

//Server part
server.listen(7000, () => {
	console.log('The server is listening ...');
});