var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser'); 
var nodemailer = require('nodemailer'); 
// var postmark = require('postmark'); 
// var client = new postmark.Client('server key')
var xoauth2 = require('xoauth2'); 
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

/* contact us form */

app.post('/contact', function(req, res){
    
    
    var transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com', 
        port: 587, 
        secure: false, 
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: 'xxxxxx@gmail.com', 
                pass: 'xxxxxx',
                clientId: '425618185395-8km3r0sgnm738lcsf7tsgffdcsppn3dv.apps.googleusercontent.com', 
                clientSecret: '3IRdCzdBgLDGtoOcUqBf06p5', 
                refreshToken: '1/EppQlfHkl5gDCE245YQaZ-5jV0tmgdrKsjHqHFP4OHo'
                
                
            })
        }
    })); 
    
    var mailOptions = {
      from: req.body.first_name + "" + req.body.last_name, 
      to: 'xxxxxxxx@gmail.com', 
      subject: req.body.subject, 
      text: req.body.message
       
    }; 
    
    transporter.sendMail(mailOptions, function(err, res){
        if(err) {
            console.log(err); 
        }
        else {
            res.redirect('/contact'); 
        }
    }); 
}); 

// code for postmaster js (not working)
// app.post('/contact', function(req, res){
//     client.sendEmail({
//         "From": 'req.body.first_name + "" + req.body.last_name', 
//         "To": 'xxxxxx@gmail.com', 
//         "Subject": 'req.body.subject', 
//         "TextBody": 'req.body.message'
//     });  
    
// }); 

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('now being served'); 
}); 