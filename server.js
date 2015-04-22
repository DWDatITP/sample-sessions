var express = require('express');
var app = express();
var session = require('express-session');
var port = process.env.PORT || 5000;

app.use(function(req, res, next){
  console.log('I am middleware!');
  req.myMiddlewareValue = "I AM MIDDLEWARE";
  res.blah = true;
  next();
});

app.use(session({
  secret: 'something secret!'
}));

app.get('/index.html', function(req, res){
  console.log('req.myMiddlewareValue = ', req.myMiddlewareValue);
  console.log('res.blah: ',res.blah);
  res.send('I am the index.html from app');
});

app.get('/home', function(req, res){
  if (!req.session.hasBeenHereBefore) {
    req.session.hasBeenHereBefore = true;
    res.send('Welcome, you are new!');
  } else {
    res.send('Welcome back, you');
  }
});

app.use(express.static('public'));

app.listen(port, function(){
  console.log('Listening on port: ',port);
});
