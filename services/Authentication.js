require('dotenv').config();

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next){
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

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(token === null){
        console.log("Unauthorized Access");
        return res.status(401).json({message:"You Unauthorized Person"});
    }

   
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,response)=>{
        if(err){
            console.log("Forbiden Access");
            return res.status(403).json({message:"Forbiden Access"});
        }else{
            console.log("Access Route");
            res.locals = response;
            next();
        }
    });
}

module.exports = { authenticateToken:authenticateToken };