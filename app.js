const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-Parser')
const app = express();
const Router = require('./router/router')
monDB='mongodb+srv://test:2234@earllee333.qx4rs.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(monDB,{ useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex:true})
.then((result)=>{
    app.listen(6031);
    console.log('connect to MonDB')
})
.catch((err)=>{console.log(err)})

app.use(express.json())
app.set('view engine','ejs')
app.use(cookieParser())
app.use(express.static('public'))
app.use(Router)