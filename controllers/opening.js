const { body, validationResult, check } = require('express-validator');
const Opening = require('../models/opening');
const UserOpenings = require('../models/userOpenings');
const emitter = require('../util/notification-event');
const  userNotificationEmitter = emitter.userNotificationEmitter;

function createOpening(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({error:true,errors:errors.mapped()} );
            return;
        } else {
            const opening = new Opening(req.body);
            opening.createdBy=req.userObj.name;
            opening.save((err, savedOpening) => {
                if (err) {
                   throw err;
                }
                res.status(201).json({error:false,message:'Opening Successfully Created!'});
            })
        }
    } catch (err) {
        return next(err)
    }
}

function getAllOpening(req, res, next) {
    try {
        const role = req.userObj.role==='manager';
        let query ='';
        if(role){
         query = { createdBy: req.userObj.name };
        }else{
            query = {status:"Open"}
        }
        Opening.find(query,'project technologies role', (err, openings) => {
            if (err) {
                console.log("Error while getting openings: ", err);
                throw err;
            }
            res.render('./../views/opening/list', {
                openings: openings
            });
        })
    } catch (err) {
        return next(err)
    }
}

function applyForOpening(req, res, next) {
    try {
        if (req.params.openingId) {
            const openingId = req.params.openingId;
            Opening.findById(openingId, (err, opening) => {
                if (err) {
                    console.log("Error while getting opening: ", err);
                } else if (opening !== null && opening.status === 'Open' && req.userObj.userId) {
                    UserOpenings.find({
                        userId: req.userObj.userId,
                        openingId: openingId
                    }, (err, userOpening) =>{
                        if (err) {
                            console.log("Error while getting user opening: ", err);
                        }else if(userOpening.length===0 && req.userObj){
                            const userOpeningNew = new UserOpenings({userId:req.userObj.userId,openingId: openingId});
                            userOpeningNew.save();
                            //notification sent to manager
                            userNotificationEmitter.emit('userApplication',req.userObj.name,openingId);

                            res.status(201).json({error:false,message:'Successfully Applied for Opening!'});
                        }else {
                            res.status(409).json({error:true,message:'Already Applied for this Opening!'});
                        }
                    });
                } else if(opening===null) {
                    res.status(404).json({error:true,message:'Not found'});
                }else{
                    res.status(406).json({error:true,message:'Opening is closed'});
                }
            })
        } else {
            res.status(400).json({message:"Bad Request"});
            res.end();
            return;
        }
    } catch (err) {
        return next(err)
    }
}

function updateOpening(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({error:true,errors:errors.mapped()} );
            return;
        } else {
            const opening = new Opening(req.body);
            var query = {
                 _id: req.body._id,
                 createdBy : req.userObj.name
                };
            Opening.findOneAndUpdate(query, opening, (err, opening) => {
                if (err) {
                    console.log("Error while updating opening: ", err);
                } else if (opening !== null) {
                    if(opening.status==='closed'){
                        let userOpeningQuery = {openingId:req.body._id };
                        UserOpenings.find( userOpeningQuery, (err, userOpenings)=>{
                            let userIds = [];
                            userOpenings.forEach(function(userOpening){
                                userIds.push(userOpening.userId);
                            });
                            //notification sent to users
                            userNotificationEmitter.emit('closeOpening',userIds,opening.project, opening.client);
                        })
                    }
                    res.status(200).json({error:false,message:'Successfully Updated!'});
                } else {
                    res.status(400).json({error:true,message:"Some issue while updating"});
                    res.end();
                    return;
                }
            })
        }
    } catch (err) {
        return next(err)
    }
}

function getOpeningById(req, res, next) {
    try {
        if (req.params.id) {
            Opening.findById(req.params.id, (err, opening) => {
                if (err) {
                    throw new Error("Error while getting opening: ", err);
                } else if (opening != null) {
                    res.status(200).json({error:false,message:"Success",opening:opening});
                } else {
                    res.status(404).json({error:true,message:"Not found"});
                    return;
                }
            })
        } else {
            res.status(400).json({error:true,message:"Bad Request"});
            res.end();
            return;
        }
    } catch (err) {
        return next(err)
    }
}

function findOpeningForUpdate(req, res, next) {
    try {
       let query = { 
           _id:req.params.id,
           createdBy: req.userObj.name 
        };
        if (req.params.id) {
            Opening.findOne(query, (err, opening) => {
                if (err) {
                    console.log("Error while getting opening: ", err);
                } else if (opening != null) {
                    console.log(opening)
                    res.render('./../views/opening/update', {
                        opening: opening,
                        errors: {}
                    });
                } else {
                    res.status(404).json({message:"Not found"});
                    return;
                }
            })
        } else {
            res.status(400).json({message:"Bad Request"});
            res.end();
            return;
        }
    } catch (err) {
        return next(err)
    }
}

function validate(method) {
    switch (method) {
        case 'createOpening': {
            return [
                check('project', 'project name should not be empty').trim().notEmpty(),
                check('project', 'project name must be 3 chars long and 30 chars short').isLength({ min: 3, max: 30 }),
                check('client', 'client name should not be empty').trim().notEmpty(),
                check('client', 'client name must be 3 chars long and 30 chars short').isLength({ min: 3, max: 30 }),
                check('technologies', 'technologies should not be empty').trim().notEmpty(),
                check('technologies', 'technologies must be 2 char long and 50 chars short').isLength({ min: 2, max: 50 }),
                check('role', 'role should not be empty').trim().notEmpty(),
                check('role', 'role must be 1 char long and 10 chars short').isLength({ min: 1, max: 10 }),
                check('desc', 'description should not be empty').trim().notEmpty(),
                check('desc', 'description must be 5 chars long and 50 chars short').isLength({ min: 5, max: 50 }),
            ]
        }
    }
}

module.exports = {
    createOpening,
    validate,
    getAllOpening,
    getOpeningById,
    updateOpening,
    findOpeningForUpdate,
    applyForOpening
}