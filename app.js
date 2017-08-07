var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser'); 
var nodemailer = require('nodemailer'); 
// var postmark = require('postmark'); 
// var client = new postmark.Client('server key')
// var xoauth2 = require('xoauth2'); 
var smtpTransport = require('nodemailer-smtp-transport'); 


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/Assets'));
app.use(express.static(__dirname + '/scripts'));

/* routes */

app.get('/', function(req, res){
    res.render('home'); 
}); 

app.get('/about', function(req, res){
   res.render('about');  
}); 

app.get('/artists', function(req, res){
    res.render('artists'); 
}); 

app.get('/contact', function(req, res){
    res.render('contact');     
});

app.get('/events-past', function(req, res){
    res.render('events-past'); 
});

app.get('/events-upcoming', function(req, res){
    res.render('events-upcoming'); 
}); 

app.post('/contactsent', function(req, res){
    res.send('You Hit the Post Route'); 
    
    var mailOpts, smtpTrans;
    
    smtpTrans = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: 'robert.w.mullins3@gmail.com',
        pass: 'sublime88'
      }
    }); 
    
    mailOpts = {
      from: req.body.first_name + " " + req.body.last_name,  
      to: 'robert.w.mullins3@gmail.com',
      subject: req.body.subject,
      text: req.body.email + " " + req.body.message
    }; 
    
    smtpTrans.sendMail(mailOpts, function (err, res) {
      
      if (err) {
          console.log('There was a problem')
      }
      else {
          console.log('Email sent!')
      }
    }); 

}); 

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log('server is started'); 
});