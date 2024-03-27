require('dotenv').config();
const express = require('express');
const path = require('path');
const portfinder = require('portfinder');
const app = express();
const bodyParser = require('body-parser');

const registration = require('./routes/registration/registration.js');
const login = require('./routes/login/login.js');
const forgotpassword = require('./routes/forgotpassword/forgotpassword.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

//routes
app.use(registration);
app.use(login);
app.use(forgotpassword);


portfinder.getPort(function(err,port){
        try{
            if(err) throw err
            app.listen(port,(error)=>{
                console.log("Server Listen At "+port);
            });
        }catch(err){
            console.log("Error In Server Listen: "+err);
        }
});

//middleware 
app.use(express.static(path.join(__dirname,'public')));

//ejs file render we need to set path of located files
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

