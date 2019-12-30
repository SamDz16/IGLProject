var express = require('express');
var server = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Astudent = require('./models/student');
const StudentPermut = require('./models/student_permut');
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
	extended: true
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
	extended: true
}), (req, res, next) => {

	//Connect to database
	mongoose.connect('mongodb://localhost:27017/PERMUTATION', {
		useUnifiedTopology: true,
		useNewUrlParser: true
	});

	//Testing the connection to the database
	mongoose.connection.once('open', () => {
		// console.log("Connected to the database");

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
		// console.log('connected to mongo');
		const db = client.db();
		db.collection('requests').find().toArray().then((demande) => {
			res.render('Consultation', {
				demande: demande // res.send (demande)
			}); // Quand il clique sur le button consulter
		});
		client.close();
	});
});

//La partie admin
server.get('/admin', function (req, res, next) {
	res.render('admin')
});

server.post('/Permutation', function (req, res, next) {
	// 	MongoClient.connect('mongodb://localhost:27017/PERMUTATION', {
	// 		useNewUrlParser: true,
	// 		useUnifiedTopology: true
	// 	}, (err, client) => {
	// 		console.log('connected to mongo');

	// 		const db = client.db();

	// 		var result = db.collection('requests').find().forEach(function (doc) {
	// 			var id = doc.matricule;
	// 			console.log(id);
	// 			var result = db.collection('requests').find({
	// 				groupeA: doc.groupeV,
	// 				groupeV: doc.groupeA
	// 			}).forEach(function (docu) {
	// 				console.log(docu.groupeV);
	// 				console.log(docu.groupeA);
	// 				console.log("hello");
	// 				db.collection('requests').updateOne({
	// 					groupeA: doc.groupeV,
	// 					groupeV: doc.groupeA
	// 				}, {
	// 					$set: {
	// 						groupeA: doc.groupeA,
	// 					}
	// 				}, {
	// 					upsert: false
	// 				})
	// 				db.collection('requests').updateOne({
	// 					matricule: id
	// 				}, {
	// 					$set: {
	// 						groupeA: docu.groupeA
	// 					}
	// 				})
	// 			}, function (err) {
	// 				console.log('erreur')
	// 			});
	// 			db.collection('requests').find().toArray().then(demande => {
	// 				res.render('Consultation', {
	// 					demande: demande // res.send (demande)
	// 				})
	// 			})
	// 		})
	// 	})

	//Connect to database
	mongoose.connect('mongodb://localhost:27017/PERMUTATION', {
		useUnifiedTopology: true,
		useNewUrlParser: true
	});

	var nombre;

	//Testing the connection to the database
	mongoose.connection.once('open', () => {
		console.log("Connected to the database");

		Astudent.countDocuments({}, function (err, count) {
			nombre = parseInt(count);
		})

		var recordSuppTab = new Array(); //Contains the records to be deleted
		var i = 0; //Indice of the array
		var cont = new Boolean(true);

		do {
			Astudent.findOne({})
				.then(function (result1) {
					if (result1 != null) {

						const groupeActuel = result1.groupeA
						const groupeVoulu = result1.groupeV

						Astudent.findOne({
								groupeA: groupeVoulu
							})
							.then(function (result2) {
								//do {
								if (result2 != null) {

									nombre = nombre - 2;
									console.log(nombre)

									//Permutation is possible
									result1.groupeA = groupeVoulu
									result2.groupeA = groupeActuel

									//Add the two students to the permuts collection
									var student1 = new StudentPermut({
										nom: result1.nom,
										prenom: result1.prenom,
										matricule: result1.matricule,
										email: result1.email,
										groupeA: result1.groupeA,
										groupeV: result1.groupeV
									});
									student1
										.save()
										.then(() => {
											console.log("The first student is added to the permuts collection");
										})

									var student2 = new StudentPermut({
										nom: result2.nom,
										prenom: result2.prenom,
										matricule: result2.matricule,
										email: result2.email,
										groupeA: result2.groupeA,
										groupeV: result2.groupeV
									});
									student2
										.save()
										.then(() => {
											console.log("The second student is added to the permuts collection");
										})

									//Delete the two student from the requests collection
									Astudent.findOneAndDelete({
											matricule: result1.matricule
										})
										.then(function () {
											console.log("The first student is removed from the requests collection")
										})

									Astudent.findOneAndDelete({
											matricule: result2.matricule
										})
										.then(function () {
											console.log("The second student is removed from the requests collection")
										})
								} else {
									//result2 === null
									console.log("result2 is equal to null")
									if (nombre === 1) {
										cont = false;
									} else {
										recordSuppTab[i] = result1;
										console.log(recordSuppTab);
										i = i + 1;
										Astudent.findOneAndDelete({
												matricule: result1.matricule
											})
											.then(() => {
												nombre = nombre - 1;
											})
										// Astudent.findOne({})
										// 	.then(function (result0) {
										// 		console.log(result0);
										// 		result1 = result0;
										// 		nombre = nombre - 1;
										// 	})
										//})
									}
								}
								console.log(nombre)
								//console.log('I am here');
								//} while (cont == false);

								if (cont === false) {
									console.log("Length == " + recordSuppTab.length)
									for (var i = 0; i < recordSuppTab.length; i++) {

										var student0 = new Astudent({
											nom: recordSuppTab[i].nom,
											prenom: recordSuppTab[i].prenom,
											matricule: recordSuppTab[i].matricule,
											email: recordSuppTab[i].email,
											groupeA: recordSuppTab[i].groupeA,
											groupeV: recordSuppTab[i].groupeV
										});
										student0
											.save()
											.then(() => {})
									}

									res.redirect('/');
								}
								console.log("Je suis la")
							})
						console.log("Je ne passe pas")
					} else {
						console.log("The database is empty !");
						cont = false;
						res.redirect('/');
					}
					console.log("Encore laaa");
				})
		} while (cont === false)
	}).on('error', (error) => {
		console.log('Error while connecting to the database : ', error);
	})
})

//La partie serveur
server.listen(7000, () => {
	console.log('The server is listening ...');
});