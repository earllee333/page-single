const User = require('../modules/User')
const jwt = require('jsonwebtoken')
const { render } = require('ejs')

const headerError = (err)=>{

    let errors = {email:'',password:''}//add value in to email
    // duplicate error code
    
    
    if(err.code ===11000){
        errors.email = 'This email is already registered'
        return errors;
    }
    // validation errors
    console.log(err.message,err.code);
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    if(err.message==='incorrect password'){
        errors.password = 'This password is incorrect'
    }
    
    if(err.message==='incorrect email'){
        errors.email = 'This email is not registered'
    }

    return errors;

    

}

const maxAge = 3*24*60*60
const createToken = (id)=>{
    return jwt.sign({id},'net hung secret',{
        expiresIn:maxAge
    });
}

const homepage = (req, res)=>{
    res.render('home')
}
const login_get = (req,res)=>{
    res.render('login')
}
const signup_get = (req,res)=>{
    res.render('signup')
}
const login_post = async (req,res)=>{
    const {email,password}= req.body
    
    try{
        const user = await User.login(email,password)
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(200).json({user:user._id})
    }
    catch(err){
        const errors = headerError(err)
        res.status(400).json({errors})
    }
}
const smoothies = (req,res)=>{ res.render('smoothies')}


const signup_post = async (req,res)=>{
   const {email,password} = req.body;

   try{
       const user = await User.create({email,password})
       const token = createToken(user._id) 
       res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
       res.status(201).json({user:user._id})
       
       
        
   }
   catch(err){
    const errors = headerError(err);
    res.status(400).json({errors})
   }
}





const log_out = (req,res)=>{
    const {email} = req.body
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/')
    console.log(user.id+' left')
}
const text = (req,res)=>{
    res.render('text')
}





module.exports={text,homepage,login_get,signup_get,login_post,signup_post,log_out,smoothies}