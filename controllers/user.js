const { body, validationResult, check } = require('express-validator');
const User = require('../models/user');
const passport = require('passport');
const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

async function createUser(req, res, next) {
    try {
       const err = validateUser(req.body)
        if (err.length!==0) {
            if(req.file!==undefined){
                await unlinkAsync(req.file.path);
            }
            res.status(400).json({error:true,errors:err} );
            return;
        }
        if(req.file===undefined){
            res.status(400).json({error:true,message:"Profile picture is required!"});
            res.end();
            return;
        }
        let username = req.body.username;
        User.findOne(
            {
                username,
            },
            async (err, user) => {
                if (user != null) {
                    if(req.file!==undefined){
                        await unlinkAsync(req.file.path);
                    }
                    res.status(400).json({ error:true,message: 'user already exists with same username' });
                    res.end();
                    return;
                } else {
                    const user = new User(req.body);
                    await user.setHashedPassword();
                    user.save((err, savedUser) => {
                        if (err) {
                            throw err;
                        }
                        res.status(201).json({error:false,message:'user is registered successfully'} );
                    })
                }
            });
    } catch (err) {
        return next(err)
    }
}
function loginUser(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({error:true,errors:errors.mapped()} );
        } else {
            passport.authenticate('local', { session: false }, function (err, user, info) {
                if (user) {
                    res.clearCookie("token");
                    let obj = user.toAuthJson();
                    res.cookie("token", obj.token, { maxAge: 1800000, httpOnly: true })
                    res.status(200).json({error:false,message:'Login successfully'} );
                }else{
                    res.status(401).json({error:true,message:'User credentials does not match!'} );
                    return;
                }
            })(req, res, next);
        }
    } catch (err) {
        return next(err)
    }
}

function logoutUser(req, res, next){
    if(req.cookies.token){
        res.clearCookie("token");
        res.status(200).json({error:false,message:"Logout successfully!"});
        return;
      }else{
        res.status(400).json({error:true,message:"Bad Request"});
        res.end();
        return;
      }
}

function validateUser(user){
    let errors= [];
    if(user.username===undefined || user.username===null || user.username.trim()===''){
        errors.push({ 'msg': 'Username should not be empty' });
    }
    if(user.password===undefined || user.password===null || user.password.trim()===''){
        errors.push({ 'msg': 'password should not be empty' });
    }
    if(user.role===null || (user.role!=='employee' && user.role!=='manager')){
        errors.push({ 'msg': 'role is required' });
    }
    return errors;
}

function validate(method) {
    switch (method) {
        case 'createUser': {
            return [
                check('username', 'Username is required').trim().notEmpty(),
                check('password', 'password is required').trim().notEmpty(),
                body('role', 'role is required').isIn(['manager', 'employee']).exists()
            ]
        }
        case 'loginUser': {
            return [
                check('username', 'Username should not be empty').trim().notEmpty(),
                check('password', 'Password should not be empty').trim().notEmpty(),
            ]
        }
    }
}


module.exports = {
    createUser,
    validate,
    loginUser,
    logoutUser
}