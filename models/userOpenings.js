const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserOpeningsSchema = new Schema({
  userId: String,
  openingId: String,
});

module.exports = mongoose.model('UserOpenings', UserOpeningsSchema);