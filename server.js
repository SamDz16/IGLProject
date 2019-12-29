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
	
	MongoClient.connect ('mongodb://localhost:27017/IGL',{useNewUrlParser: true,
	useUnifiedTopology: true},(err,client)=>{
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
		MongoClient.connect ('mongodb://localhost:27017/IGL',{useNewUrlParser: true,
		useUnifiedTopology: true}, (err,client)=>{
		console.log('connected to mongo'); 
        
		const db=client.db(); 
		
		var result=db.collection ('demande').find().forEach(function(doc)
		{   
			var id= doc.matricule;
			console.log(id);
			var result=db.collection ('demande').find({groupeA:doc.groupeV,groupeV:doc.groupeA}).forEach(function(docu) {
				console.log(docu.groupeV);
				console.log(docu.groupeA);
				console.log("hello");			
			db.collection ('demande').updateOne({ groupeA:doc.groupeV,groupeV:doc.groupeA},  
						{$set:{
					
					groupeA:doc.groupeA,	
					
						
						
				
					}},
					{upsert:false})
					db.collection('demande').updateOne({matricule:id},{$set:{groupeA : docu.groupeA }})
					
					
					
			 
			

				
			
		},function(err){console.log('erreur')});
		db.collection ('demande').find().toArray().then(demande=>{

			res.render('Consultation',{ 
				demande:demande // res.send (demande)
			})})
		
		
		
		})})})
	


	



//la partie serveur
server.listen(3001,'127.0.0.1');
	console.log('The server is listening ...');
