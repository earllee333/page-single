const jwt = require('jsonwebtoken');
const User = require('../modules/User')

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;//cookie's'
    if(token){
        jwt.verify(token,'net hung secret',(err,decodeToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login')
            }
            else{
                console.log(decodeToken);//payload id properties
                next()
            }
        })
    }
    else{
        res.redirect('/login')
    }
}
const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'net hung secret',async (err,decodeToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user= null
                next()
                
            }
            else{
                console.log(decodeToken)
                let user = await User.findById(decodeToken.id)// a call back function need usong asy
                res.locals.user= user//
                next()

            }
        })
    }
    else{
        res.locals.user= null;
        next();
    }
}


module.exports={ requireAuth, checkUser}