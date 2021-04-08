const express = require('express');
const User = require('../modules/User');
const jwt = require('jsonwebtoken')

const handleErrors = (err)=>{
    console.log(err.message,err.code);
    let errors = {email:'',password:''};
    //duplicate error code
    if(err.code === 11000){
        errors.email = 'that email is already registered';
        return errors;
    }
    
    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message
        })
    }
    // email incorrect
    if(err.message ==='Type a valid email'){
        errors.email='this password is incorrect';
    }
    //password incorrect
    if(err.message ==='Type a password'){
        errors.password='this password is incorrect';
    }
    return errors;
}

const maxAge = 3*24*60*60
const createToken = (id)=>{
    return jwt.sign({id},'net hung secret',{
        expiresIn:maxAge
    })
}

const homepage = (req,res)=>{
    res.render('home');
}
const log_in = (req,res)=>{
    res.render('login');
}
const log_post = async(req,res)=>{
    const {email,password} = req.body;
    
    try{
        const user =await User.login({email,password})
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(201).json({user:user._id})
        console.log('User is loging')
    }
    catch(err){
        const errors = handleErrors(err)
        res.status(400).send('user has trouble')

    }
    
}
const sign_up = (req,res)=>{
    res.render('signup');
}
const sign_post = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user =await User.create({email,password})
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
        res.status(201).json({user:user._id})
        console.log('User is created')
    }
    catch(err){
        const errors = handleErrors(err)
        res.status(404).json({errors})

    }
}
const log_out = (req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/')
}
module.exports = {homepage,sign_up,log_in,log_post,sign_post,log_out};