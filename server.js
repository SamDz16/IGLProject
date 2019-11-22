var express = require('express');
var server = express();
var path = require('path');
var bodyParser = require('body-parser');
const MongoClient = require ('mongodb').MongoClient; 


server.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, 'interface', 'Etudiant.html'));
});

server.post('/Etudiant', bodyParser.urlencoded({ extend: true }), (req, res, next) => {
	
	MongoClient.connect ('mongodb://localhost:27017/IGL', (err,client)=>{
	console.log('connected to mongo'); 
	const db=client.db(); 
	db.collection ('demande').insertOne({  
		nom :req.body.nom,
		prenom :req.body.prenom ,
		matricule :req.body.matricule,
		email :req.body.email,  
		groupeA :req.body.grrA, 
		groupeV: req.body.grV

	}).then (result=> { 
		console.log ('votre demande a été enregistré');
		res.redirect ('/');
	}) 
	

	client.close();
});
});


server.listen(3001,'127.0.0.1');
	console.log('The server is listening ...');
