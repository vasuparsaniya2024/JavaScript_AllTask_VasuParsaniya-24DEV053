
const connection = require('../../connection.js');
// const bcrypt = require('bcrypt');
const md5 = require('md5');
const logger = require('../../logs.js');

/**this not work when your server is not reload means that page is not reload
 * so we need to implement in API*/

// var generateactivationcode = generaterandomstring(12).then((data) => {
//     console.log("generate activation code function call");
//     activationcode = data;
// });


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


async function userregistration(req, res) {
    const userregistrationdata = req.body;
    let user_id;
    let pwd_salt;


    const usercheck = `SELECT email FROM usersregistration WHERE email = '${userregistrationdata.email}' AND user_status = 1;`
    connection.query(usercheck, async (err, result) => {
        try {
            if (err) throw err
            if (result.length > 0) {
                //register user
                //409 indicate cinflict when add or updte exist data
                // return res.status(409).json({ message: "User Already Exist" });
            } else {

                //await before execute

                let generatesalttemp = generaterandomstring(4).then((data) => {
                    pwd_salt = data;
                });

                await generatesalttemp;  //give pwd_salt

                // await generateactivationcode;

                let activationcode;

                await generaterandomstring(12).then((data) => {
                    activationcode = data;
                });


                const userregister = `INSERT INTO usersregistration(firstname,lastname,phonenumber,email,pwd_salt) VALUES(?,?,?,?,?);`;

                connection.query(userregister, [userregistrationdata.fname, userregistrationdata.lname, userregistrationdata.phonenumber, userregistrationdata.email, pwd_salt], async (error, result) => {
                    try {
                        if (error) throw error;
                        user_id = result.insertId;  //lastinserted id

                        await insertactivationcode(user_id, activationcode);  //insert into linkactivationcodes

                        return res.status(200).json({ message: "Data Save Please Activate Account", userid: `${user_id}`, activationcode: `${activationcode}` });
                    } catch (error) {
                        logger.logError("User Registration: " + error);
                        return res.status(500).json({ message: "Something Went Wrong" });
                    }
                });
            }
        } catch (err) {
            logger.logError("Error In Get User Email: " + err)
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}


//activationcode insert
function insertactivationcode(user_id, code) {
    return new Promise((resolve, reject) => {

        const activationcode = `INSERT INTO linkactivationcodes(user_id,activationcode) VALUES(?,?);`;

        connection.query(activationcode, [user_id, code], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function checkactivationlink(req, res) {
    const activationData = req.body;

    const codeexpiretime = 120;   //in second this is small for testing we can increase
    //check activation data exist
    const checkactivation = `SELECT activationcode_created as activationcodedate FROM linkactivationcodes
    WHERE user_id = ${activationData.userid} AND activationcode = '${activationData.activationcode}';`;

    connection.query(checkactivation, (err, result) => {
        try {
            if (err) throw err

            if (result.length > 0) {
                //user exist with theiractivation code
                //now check activation code is exipre or not

                const activationcodedate = result[0].activationcodedate;
                const activationdatetime = new Date(activationcodedate).getTime();
                const currentdate = new Date().getTime();
                const datedifference = (currentdate - activationdatetime) / 1000; //in second 

                if (datedifference > codeexpiretime) {
                    return res.status(401).json({ message: "Your Link Expire" });
                } else {
                    return res.status(200).json({ message: "Generate password" });
                }
            } else {
                // console.log("user not found");
                //this is never happen
                //because user generate then his entry insert
                //anyone link change then this helpful
                return res.status(404).json({ message: "User Not Found" });
            }
        } catch (err) {
            logger.logError("Error In check activation code: " + err)
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}


async function regenerateactivationcode(req, res) {
    const user = req.body; //object
    const userid = user.userid;

    //now generate new activationcode

    let activationcode;

    /** here we call this promise return function because problem is that if i am  store this activationcode in global variable in file and use this thenproblem is that when page is not reload then this variable value is not change 
     * but in this case when this API call then we want new random generate activationcode
     * so that's why i implement this*/

    await generaterandomstring(12).then((data) => {
        activationcode = data;
    });


    // await generateactivationcode

    const insertnewcode = `UPDATE linkactivationcodes
                           SET activationcode = '${activationcode}'
                           WHERE user_id = ${userid};`;


    connection.query(insertnewcode, (err, result) => {
        try {
            if (err) throw err

            res.status(200).json({ message: "Please Set Password", userid: `${userid}`, activationcode: `${activationcode}` });
        } catch (err) {
            logger.logError("Error In Regenerate Activation Link"+err);
            return res.status(500).json({ message: "Internal Server Error Please Regenerate Link" });
        }
    });
}



function passwordinsert(req, res) {
    const activationData = req.body;

    //before insert password we need to check below 
    /**first check activationcode is activate or not
     * second check user id and user_status is 0 
     * then convert password in MD5 using enter password and salt_pwd 
     * then that MD5 store in table
     * after all operation make user_status 1 that indicate user have all details including password
     */

    //now check link is activate or not
    const codeexpiretime = 120;   //in second this is small for testing we can increase
    //check activation data exist
    const checkactivation = `SELECT activationcode_created as activationcodedate FROM linkactivationcodes
    WHERE user_id = ${activationData.userid} AND activationcode = '${activationData.activationcode}';`;

    connection.query(checkactivation, (err, result) => {
        try {
            if (err) throw err

            if (result.length > 0) {
                //user exist with theiractivation code
                //now check activation code is exipre or not
                // console.log("user found");

                const activationcodedate = result[0].activationcodedate;
                // console.log(activationcodedate);
                const activationdatetime = new Date(activationcodedate).getTime();
                const currentdate = new Date().getTime();
                const datedifference = (currentdate - activationdatetime) / 1000; //in second 

                if (datedifference > codeexpiretime) {
                    //Unauthorized because lacks valid authentication

                    return res.status(401).json({ message: "Your Link Expire" });
                } else {
                    //check user exist with statu_user 0 or not
                    const checkuser = `SELECT user_id,pwd_salt FROM usersregistration WHERE user_id = ${activationData.userid} AND user_status = 0;`;

                    connection.query(checkuser, (err1, result1) => {
                        try {
                            if (err1) throw err1
                            if (result1.length > 0) {
                                const pwd_salt = result1[0].pwd_salt;
                                //now convert that password in MD5

                                const finalpassword = activationData.password + pwd_salt;
                                const md5password = md5(finalpassword);

                                //now update password in table and update user_status to 1

                                const updatepassword = `UPDATE usersregistration
                                                         SET pwd_md = '${md5password}',user_status = 1
                                                         WHERE user_id = ${activationData.userid};`;

                                connection.query(updatepassword, (err2, result2) => {
                                    try {
                                        if (err2) throw err2
                                        console.group("Successfully Set Password");
                                        return res.status(200).json({ message: "Successfully Set Password" });
                                    } catch (err2) {
                                        logger.logError("Error In set password" + err2)
                                        return res.status(400).json({ message: "Unable to set password" });
                                    }
                                });


                                // bcrypt.hash(activationData.password,pwd_salt,(err,hash)=>{
                                //     try{
                                //         if(err) throw err
                                //         console.log(hash);
                                //     }catch(err){
                                //         console.log("Error In MD5 Generate ",err);
                                //     }
                                // });
                            } else {
                                //already exist resourse
                                return res.status(409).json({ message: "Already Set Password" });
                            }
                        } catch (err1) {
                            return res.status(500).json({ message: "Internal Server Error" });
                        }
                    });
                    // return res.status(200).json({message:"Generate password"});
                }
            } else {
                // console.log("user not found");
                //this is neve happen
                //because user generate then his entry insert
                //anyone link change then this helpful
                return res.status(404).json({ message: "User Not Found" });
            }
        } catch (err) {
            logger.logError("Error In check activation code: " + err)
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}

module.exports = { userregistration, checkactivationlink, regenerateactivationcode, passwordinsert }