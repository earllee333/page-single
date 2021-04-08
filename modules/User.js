const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')


const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,'Type a email address'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Type a valid email']
    },
    password:{
        type:String,
        required:[true,'Type a password'],
        minlength:[6,'more than 6 characters']
    }
})
userSchema.post('save',(doc,next)=>{
    console.log('User has created----',doc)
    //orconsole.log('User has created...')
    next()
})

userSchema.pre('save',async function(next){//hash password befor saving
    console.log('user is creating&saving',this);
    const salt = await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt);
    next()
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            console.log(user.email+' is logging')
            return user
            
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}



const User = mongoose.model('user',userSchema)
module.exports=User;