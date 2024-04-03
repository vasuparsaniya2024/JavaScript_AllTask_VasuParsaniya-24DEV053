require('dotenv').config();
const express = require('express');
const path = require('path');
const portfinder = require('portfinder');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const registration = require('./routes/registration/registration.js');
const login = require('./routes/login/login.js');
const forgotpassword = require('./routes/forgotpassword/forgotpassword.js');

const home = require('./routes/HomePage/Home.js');
const javascripttask = require('./routes/javascripttask/javascripttask.js');


// const pagginationcomponent = require('./routes/pagginationcomponent.js');
// const insertStudentDetails = require('./routes/insertRecords.js');

// const dynamiccombo = require('./routes/Task-15/DynamicCombo_exercise6/dynamiccombo.js') // remainning

const jasonplaceholder = require('./routes/Task-18/Exercise1/jsonplaceholdertable.js');

const timezoneconverter = require('./routes/Task-19/timezonebycity/timezonecity.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

//middleware 
app.use(express.static(path.join(__dirname,'public')));

//ejs file render we need to set path of located files
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


app.use(cookieParser());

//routes
app.use(registration);
app.use(login);
app.use(forgotpassword);

app.use(home);

app.use(javascripttask);

// app.use(dynamiccombo);

app.use(jasonplaceholder);

app.use(timezoneconverter);

// app.use(insertStudentDetails);
// app.use(user);
// app.use(pagginationcomponent);
// app.use(pagginationwithcomponent);
// app.use(studentAttandance);
// app.use(studentResult);

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



//put this at last because any route not found then execute this
app.use((req,res)=>{
    res.render('homepage',{message:"Not Found"});
});