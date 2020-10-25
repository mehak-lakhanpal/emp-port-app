const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const jwtSecret = process.env.JWT_SECRET;

const UserSchema = new Schema({
    username: String,
    password: String,
    role: String
});

UserSchema.methods.setHashedPassword = async function(){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
};


UserSchema.methods.validatePassword = async function(password){
    const pwdMatches = await bcrypt.compare(password, this.password);
    return pwdMatches;
};

UserSchema.methods.generateJwtToken = function(){
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate()+1);

    return jwt.sign({
        id: this._id,
        username: this.username,
        role:this.role,
        exp: parseInt(expirationDate.getTime()/1000, 10),
    }, jwtSecret)
};

UserSchema.methods.toAuthJson = function(){
    console.log(this.username, this._id)
    return{
        username: this.username,
        _id: this._id,
        token: this.generateJwtToken()
    } ;
};

module.exports= mongoose.model("User",UserSchema);