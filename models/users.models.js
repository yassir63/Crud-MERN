const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ValidateUser = require('../validation/Users.validation')

const UserSchema = new Schema({
    Email: String,
    Lastname: String,
    Firstname: String,
    Age: String,

},
{
    timestamps : true
})



module.exports = mongoose.model('users',UserSchema)