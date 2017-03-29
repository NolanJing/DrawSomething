var express = require('express');
var http = require('http');
var socket = require('socket.io');
var fs = require('fs');
var url = require('url');

const app = express();

var http = http.Server(app);
var io = socket(http);

http.listen(3000, function () {
  console.log('listening on *:3000');
});

// prod-env
/* http.listen(8080, function () {
 console.log('listening on *: 8080');
 }); */

app.use(express.static(__dirname));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

exports.io = io;

