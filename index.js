require('dotenv').config();
const express = require('express');
const path = require('path');
const portfinder = require('portfinder');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const javascripttask = require('./routes/javascripttask/javascripttask.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//middleware 
app.use(express.static(path.join(__dirname, 'public')));

//ejs file render we need to set path of located files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cookieParser());

//routes

app.use(javascripttask);




// app.use(insertStudentDetails);
// app.use(user);
// app.use(pagginationcomponent);
// app.use(pagginationwithcomponent);
// app.use(studentAttandance);
// app.use(studentResult);

portfinder.getPort(function (err, port) {
    try {
        if (err) throw err
        app.listen(port, (error) => {
            console.log("Server Listen At " + port);
        });
    } catch (err) {
        console.log("Error In Server Listen: " + err);
    }
});



//put this at last because any route not found then execute this
app.use((req, res) => {
    res.render('homepage', { message: "Not Found" });
});