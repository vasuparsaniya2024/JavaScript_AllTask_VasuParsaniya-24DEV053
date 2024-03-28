require('dotenv').config();
const express = require('express');
const router = express.Router();

const connection = require('../../connection.js');

const logindetailsbackend = require('../../controller/login/loginbackend.js');

const md5 = require('md5');
const jwt = require('jsonwebtoken');

router.get('/userlogin',(req,res)=>{
    return res.render("login/login");
});

router.post('/userlogin',logindetailsbackend.logindetailsbackend,(req,res)=>{
    const loginData = req.body;

    // console.log(loginData);

    /**login process 
     * first check that enter username(email) is exist or not and check that his user_status is 1
     * if exist then retrive pwd_salt and enter password concat pwd_salt at last then convert it into md5
     * that md5 is match with already store md5 in database.
     * then if all details true then successfully login
     *and generate jwt token and store in the local storage
     */
    const checkuser = `SELECT pwd_salt,pwd_md FROM usersregistration WHERE email='${loginData.username}' AND user_status=1;`;

    connection.query(checkuser,(err,result)=>{
        try{
            if(err) throw err

            //in this 401 error return three place because if we saw particular error then our system half of security is broken then 

            if(result.length > 0){
                //user exist with password and enter email
                //now compare password with pwd_md
                // console.log("user exist");
                const finalepassword = loginData.password + result[0].pwd_salt;
                const pwdmd5 = md5(finalepassword);
                // console.log(result[0].pwd_md);
                // console.log(pwdmd5);

                if(pwdmd5 !== result[0].pwd_md){
                // console.log("wrong password");
                    return res.status(401).json({message:"Invalid Credentials"});
                }else{
                // console.log("login success");
                /**maxAge is the expire time of coolie */
                const response = {username:loginData.username};
                const accessToken = jwt.sign(response,process.env.ACCESS_TOKEN,{expiresIn: '8h'})
                    return res.cookie("accesstoken",accessToken,{maxAge: 8 * 60 * 60 * 1000,httpOnly:true}).status(200).json({message:"Login Successfully",token:accessToken});
                }
            }else{
                // console.log("user exist but password not set");
                return res.status(401).json({message:"Invalid Credentials"});
            }
        }catch(err){
            console.log("somthing error");
            return res.status(401).json({message:"Invalid Credentials"});
        }
    });
});


module.exports = router;