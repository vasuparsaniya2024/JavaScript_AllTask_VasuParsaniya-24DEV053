require('dotenv').config();
const express = require('express');
const path = require('path');
const portfinder = require('portfinder');
const app = express();
const bodyParser = require('body-parser');

const registration = require('./routes/registration/registration.js');
const login = require('./routes/login/login.js');
const forgotpassword = require('./routes/forgotpassword/forgotpassword.js');

const home = require('./routes/HomePage/Home.js');
const javascripttask = require('./routes/javascripttask/javascripttask.js');

const studentlist = require('./routes/Task-9/studentdataingrid_exercise1_routes/user.js');
const pagginationwithcomponent = require('./routes/Task-10/studentdataingridwithpaggination_exercise2_routes/pagginationwithcomponent.js');
// const pagginationcomponent = require('./routes/pagginationcomponent.js');
// const insertStudentDetails = require('./routes/insertRecords.js');
// const studentAttandance = require('./routes/studentattendance_exercise3_routes/studentAttandance.js');
// const studentResult = require('./routes/studentresult_exercise4_routes/studentResult.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

//routes
app.use(registration);
app.use(login);
app.use(forgotpassword);

app.use(home);

app.use(javascripttask);

app.use(studentlist);
app.use(pagginationwithcomponent);

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

//middleware 
app.use(express.static(path.join(__dirname,'public')));

//ejs file render we need to set path of located files
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

