var express = require('express');
var app = express();
var session = require('express-session');
var port = process.env.PORT || 5000;

app.use(session({
  secret: 'something secret!'
}));

app.use(express.static('public'));

app.get('/home', function(req, res){
  console.log(req.session);
  var hasSeen = req.session.hasSeen;
  if (!hasSeen) {
    req.session.hasSeen = true;
    res.send('Welcome, you are new');
  } else {
    res.send('Welcome back, whoever you are');
  }
});

app.listen(port, function(){
  console.log('Listening on port: ',port);
});
