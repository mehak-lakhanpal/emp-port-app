const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OpeningSchema = new Schema({
    project: String,
    client: String,
    technologies: String,
    role:String,
    desc:String,
    status:String,
    createdBy:String
});


module.exports= mongoose.model("Opening",OpeningSchema);