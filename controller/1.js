const express = require('express');
const User = require('../modules/User');

const handleErrors = (err)=>{
    console.log(err.message,err.code);
    let errors = {email:'',password:''};
    //duplicate error code
    if(err.code === 11000){
        errors.email = 'that email is already registered';
        return errors;
    }
    
    //validation errors
    if(err.message.includes('Type a valid email')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message
        })
    }
    // email incorrect
    if(err.message ==='Type a email address'){
        errors.email='this password is incorrect';
    }
    //password incorrect
    if(err.message ==='Type a password'){
        errors.password='this password is incorrect';
    }
    return errors;
}

const homepage = (req,res)=>{
    res.render('home');
}
const log_in = (req,res)=>{
    res.render('login');
}
const log_post = (req,res)=>{

}
const sign_up = (req,res)=>{
    res.render('signup');
}
const sign_post = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user =await User.create({email,password})
        res.status(201).json({user:user._id})
    }
    catch(err){
        const errors = handleErrors(err)
        res.status(404).json({errors})

    }

}
module.exports = {homepage,sign_up,log_in,log_post,sign_post};