var express = require('express');
var server = express();

var controller = require('./manage/controller');

server.use('/assets', express.static('./assets'));

server.set('view engine', 'ejs');

controller(server);

server.listen(7000, () => {
	console.log('The server is listening ...');
});
