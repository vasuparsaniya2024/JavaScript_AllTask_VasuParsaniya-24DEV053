require('dotenv').config();
const express = require('express');
const router = express.Router();
const md5 = require('md5');

const connection = require('../../connection.js');
const forgotpasswordbackendvalidation = require('../../controller/forgotpassword/forgotpasswordbackend.js');

router.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword/forgotpassword');
});

router.post('/forgotpassword', forgotpasswordbackendvalidation.forgotpasswordbackendvalidation, (req, res) => {
    const requestData = req.body;

    let activationcode;
    /**First in request we get email enter by user 
     * using this email we check that that is exist or not and user with status 1
     * if not exist then show error message not specific message but in general message
     * if exist then generate new activationcode and store in table 
     * that activation link show
     * when click on that link the first check that this is activate or not 
     * this checking of link activation i use registratio.js API /checkactivationlink because logic is same
     * if link is expire then regenerate the link
     * same as registration process
     */

    //check user exist or not

    const checkuserexist = `SELECT user_id FROM usersregistration WHERE email = '${requestData.email}' AND user_status = 1`;

    connection.query(checkuserexist, async (err, result) => {
        try {
            if (err) throw err
            if (result.length > 0) {
                await generaterandomstring(12).then((data) => {
                    activationcode = data;
                });

                const insertnewcode = `UPDATE linkactivationcodes
                           SET activationcode = '${activationcode}'
                           WHERE user_id = ${result[0].user_id};`;

                connection.query(insertnewcode, (err1, result1) => {
                    try {
                        if (err1) throw err1
                        //user exist
                        return res.status(200).json({ message: "click on link and set new password", userid: `${result[0].user_id}`, activationcode: `${activationcode}` });
                    } catch (err) {
                        console.log("Error In Insert New Activationcode ", err);
                        return res.status(500).json({ message: "Something Went Wrong" });
                    }
                });
            } else {
                //user not exist
                return res.status(404).json({ message: "Something Went Wrong" });
            }
        } catch (err) {
            console.log("Error In forgot password ", err);
            return res.status(500).json({ message: "Something Wen Wrong" });
        }
    });
});


function generaterandomstring(length) {
    return new Promise((resolve, reject) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const characterslength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characterslength));
        }
        resolve(result);
    });
}


//this is for render page of forgotpassword
router.get('/forgotpasswordlink', (req, res) => {
    res.render('forgotpassword/linkactivationforgotpassword');
});

router.post('/updatepassword', (req, res) => {
    const requestData = req.body;
    console.log(requestData);

    /**In this update password process (means forgot password) 
     * from the requestData particuler user id exist or not with user_status 1
     * exist then retrive that user pwd_salt
     * concat salt with user enter new password at last
     * then convertt it into md5 
     * that pwd_md5 update
    */

    //check link is activate or not 
    const codeexpiretime = 60;   //in seconds
    //check activation data exist
    const checkactivation = `SELECT activationcode_created as activationcodedate FROM linkactivationcodes
    WHERE user_id = ${requestData.userid} AND activationcode = '${requestData.activationcode}';`;

    connection.query(checkactivation, (err, result) => {
        try {
            if (err) throw err

            if (result.length > 0) {
                //code exist
                //check this activation is expire or not
                console.log("user exist");
                const activationcodedate = result[0].activationcode;
                const activationcodetime = new Date(activationcodedate).getTime();
                const currenttime = new Date().getTime();
                const datedifference = currenttime - activationcodetime;

                if (datedifference > codeexpiretime) {
                    //link is expire
                    console.log("link expire");
                    return res.status(401).json({ message: "Your Link Expire" });
                } else {
                    console.log("link not expire");
                    //link is not expire
                    //check user exist or not
            
                    const checkuserexist = `SELECT pwd_salt FROM usersregistration WHERE user_id=${requestData.userid} AND user_status=1;`;

                    connection.query(checkuserexist, (err1, result1) => {
                        try {
                            if (err1) throw err1

                            if(result1.length > 0){
                            console.log("allow to update password");

                                const finalpassword = requestData.password + result1[0].pwd_salt;
                                const finalpasswordmd5 = md5(finalpassword);
                                // console.log(finalpasswordmd5);
                                const updatenewpassword = `UPDATE usersregistration
                                        SET pwd_md = '${finalpasswordmd5}'
                                        WHERE user_id = ${requestData.userid}`

                                connection.query(updatenewpassword, (err2, result2) => {
                                    try {
                                        if (err2) throw err2

                                        return res.status(200).json({ message: "Successfully Set Password" });
                                    } catch (err2) {
                                        console.log("Error in update for got password: ", err2);
                                        return res.json(400).json({ message: "Unable to set password" });
                                    }
                                });
                            } else {
                                return res.status(409).json({ message: "Something Went Wrong" });
                            }
                        } catch (err1) {
                            console.log("Forgot Password Password Update error: ", err1);
                            return res.status(500).json({ message: "Internal Server Error" });
                        }
                    });
                }
            } else {
                return res.status(404).json({ message: "User Not Found" });
            }
        } catch (err) {
            console.log("Error In Forgot Password Set:", err);
            return res.status(500).json({ message: "Something Went Wrong" });
        }
    });
});

module.exports = router;    