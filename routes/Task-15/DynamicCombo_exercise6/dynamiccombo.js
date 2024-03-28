require('dotenv').config();
const express = require('express');
const router = express.Router();
const connection = require('../../../connection.js');

const authenticateToken = require('../../../services/Authentication.js');


var ObjectData = {
    selectname : "",
    selecttype: "",
    data: []
}

var ObjectForSelectCombo = {
    selectname:[],
    selecttype:[]
}

router.get('/task15_selectcombo',authenticateToken.authenticateToken,(req,res)=>{
    const queryforselectname = `SELECT DISTINCT (select_name) as selectname FROM selectmaster`;

    const queryforselecttype = `SELECT DISTINCT (select_type) as selecttype FROM selectmaster`;

    connection.query(`${queryforselectname};${queryforselecttype}`,(err,result)=>{
        try{ 
            if(err) throw err
            console.log(result[0]);
            // console.log(result[1]);
            ObjectData.selectname = result[0];
            ObjectData.selecttype = result[1];
            res.render('Task-15/DynamicCombo_exercise6/dynamiccombo.ejs',{
                ObjectForSelectCombo:ObjectForSelectCombo,
                ObjectData:ObjectData
            });
        }catch(err){
            console.log("Erro In Get Selection For Combo Gernerate:"+err);
        }
    });
});

// --------------------get request--------------------
router.get('/task15_dynamiccombo',authenticateToken.authenticateToken,(req,res)=>{
    const selectname = req.query.selectname;
    const selecttype = req.query.selecttype;
    

    if(selectname !== undefined && selectname !== "" && selecttype !== undefined && selecttype !== ""){
        ObjectData.selecttype = selecttype;
        ObjectData.selectname = selectname;


        const query = `SELECT optionmaster.option_name as optionname, selectmaster.multiselecteallow as multiselecteallow, selectmaster.cssclass as cssclass FROM selectmaster LEFT JOIN optionmaster ON selectmaster.select_id = optionmaster.select_id WHERE selectmaster.select_name='${selectname}';`
        
        console.log(query);

        connection.query(query,(err,result)=>{
            try{
                if(err) throw err
                console.log(result);
                ObjectData.data = result;
                res.render('Task-15/DynamicCombo_exercise6/dynamiccombo.ejs',{
                    ObjectData:ObjectData
                });
                ObjectData.selectname = "";
                ObjectData.selecttype = "";
                ObjectData.data = [];
            }catch(err){
                console.log("Error In Option Get:"+err);
            }
        });
    }
});

module.exports = router;

