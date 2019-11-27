var express = require('express');
var server = express();
var path = require('path');
var bodyParser = require('body-parser');
const MongoClient = require ('mongodb').MongoClient; 

server.set ('view engine','ejs'); 


server.get('/', function(req, res, next) {
	res.render('Etudiant')});

	



server.post('/Consultation', function(req, res, next) {
	MongoClient.connect ('mongodb://localhost:27017/IGL', (err,client)=>{
		console.log('connected to mongo'); 
		const db=client.db(); 
		db.collection ('demande').find().toArray().then(demande=>{
			console.log(demande)
			res.render('Consultation',{ 
				demande:demande // res.send (demande)
			}) // quand il clique sur le button consulter
		})
		client.close();
		}) 

}); 

	
//server.post('/Consultation', bodyParser.urlencoded({ extend: true }), (req, res, next) => {
	

//})	




server.post('/Etudiant', bodyParser.urlencoded({ extend: true }), (req, res, next) => {
	
	MongoClient.connect ('mongodb://localhost:27017/IGL', (err,client)=>{
	console.log('connected to mongo'); 
	const db=client.db(); 
	db.collection ('demande').updateOne({ email :req.body.email},  
		{$set:{
		nom :req.body.nom,
		prenom :req.body.prenom ,
		matricule :+req.body.matricule, 
		groupeA :+req.body.grA, 
		groupeV: +req.body.grV

	}},
	{upsert:true}).then (result=> { 
		console.log ('votre demande a été enregistré');
		
		res.redirect ('/');
	}) 
	

	client.close();
});
}); 
	
// la partie admin 
 
server.get('/admin', function(req, res, next) {
	res.render('admin')});

	server.post('/Permutation', function(req, res, next) {
		MongoClient.connect ('mongodb://localhost:27017/IGL', (err,client)=>{
		console.log('connected to mongo'); 
		const db=client.db(); 
		var result=db.collection ('demande').find(); //tbanli hna n7ot foreach 
        result.forEach(function(doc)
		{   
			var demand =db.collection ('demande').findOne({ grV:doc.grA,grA:doc.grV});
			db.collection ('demande').updateOne({ grV:doc.grA,grA:doc.grV},  
						{$set:{
					
					grA:doc.grA,	
					grV:doc.grV,
						
						
				
					}},
					{upsert:false})
					doc.grA= demand.grA; // le probleme est ici , j'arrive pas a permuter bles valeurs
					doc.grV=demand.grV;		
			 
			

				
			
		},function(err){console.log('erreur')});
		db.collection ('demande').find().toArray().then(demande=>{

			res.render('Consultation',{ 
				demande:demande // res.send (demande)
			})})
		
		client.close();
		
		})})
	






//la partie serveur
server.listen(3001,'127.0.0.1');
	console.log('The server is listening ...');
