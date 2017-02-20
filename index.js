var express = require('express'),
	app = express(),
	http = require('http').Server(app);

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function(err, db) {
	if (err) throw err;

	console.log('Connected to mongo.');

	http.listen(3000, function() {
        console.log('Listening on localhost:3000');
	});
});

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var server = app.listen(3000, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Listening at http://%s:%s", host, port);
});