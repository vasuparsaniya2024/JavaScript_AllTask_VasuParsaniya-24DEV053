require('dotenv').config();

const express = require('express');
const router = express.Router();

const authenticateToken = require('../../../services/Authentication.js');

router.get('/task18_jsonplaceholdertable',authenticateToken.authenticateToken,(req,res)=>{
    res.render('Task-18/Exercise1/jsonplaceholdertable');
});

router.get('/post',(req,res)=>{
    res.render('Task-18/Exercise1/post');
});

router.get('/comments',(req,res)=>{
    res.render('Task-18/Exercise1/post');
});

module.exports = router;