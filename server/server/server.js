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


app.get('/draw', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('*', function(req, res){
    res.sendFile(__dirname + '/err_404.html');
});
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('chat message', function (msg) {
        // var str = msg.toString();
        // console.log('message: ' + str);
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on("path",function (pathDataDict) {
        // console.log(pathDataDict);
        io.emit('path', pathDataDict);
    });
});