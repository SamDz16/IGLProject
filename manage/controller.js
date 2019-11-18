var bodyParser = require('body-parser').urlencoded({ extend: true });

module.exports = function(server) {
	server.get('/', function(req, res, next) {
		res.render('Etudiant.ejs');
	});

	server.post('/Etudiant', bodyParser, (req, res, next) => {
		res.send(req.body);
	});
};
