require('dotenv').config();

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const logger = require('../logs');

function authenticateToken(req, res, next) {
    // const jwtOptions = {
    //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //     secretOrKey:process.env.ACCESS_TOKEN
    // };

    // passport.use(new JwtStrategy(jwtOptions,(jwtPayload,done)=>{
    //     if(jwtPayload.sub === req.username){
    //         done(null,{id:req.username});
    //         return next();
    //     }else{
    //         done(null,false);
    //         return res.send({message:"You are Unauthorized Person"});
    //     }
    // }));
    const token = req.cookies.accesstoken;

    // console.log(authHeader.split(" ")[0]);
    // console.log(token);

    if (!token) {
        // console.log("Unauthorized Access");
        logger.info("Unauthorized Access");
        // return res.status(401).json({message:"You Unauthorized Person"});
        return res.render('homepage', { message: "Unauthorized Access...." });
    }


    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
        if (err) {
            logger.info("Forbiden Access");
            return res.render('homepage', { message: "Forbiden Access...." });
        } else {
            // console.log("Access Route");
            logger.info("Access Route");
            res.locals = response;
            next();
        }
    });
}

module.exports = { authenticateToken: authenticateToken };