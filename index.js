var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var APIKEY = '5dbc8c5760ea7e0b2270b05eb0b070279deab3507574e072d';
var Wordnik = require('wordnik-bb').init(APIKEY);

var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/eightball');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('morgan')('dev'));

app.use('/random', require('./controllers/random.js'));
app.use('/api/eightballs', require('./controllers/eightball-controller'));

app.get('/*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});


var leftVotes = 0;
var rightVotes = 0;
io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('right-vote', function(msg) {
    console.log("got right vote");
    rightVotes++;
    emitVotes();
  });
  socket.on('left-vote', function(msg) {
    console.log("got left vote");
    leftVotes++;
    emitVotes();
  });

  function emitVotes() {
    var votes = {left: leftVotes, right: rightVotes};
    io.emit('vote-count', votes);
  }

});

var server = http.listen(process.env.PORT || 3000);

