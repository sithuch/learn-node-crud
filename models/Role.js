
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = new Schema({
    name: { type: String, required: true },
    description:String,
    role: { type:String,enum: ['admin', 'user', 'guest'] },
})
module.exports = mongoose.model('Role', RoleSchema);