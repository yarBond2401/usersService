const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name field should be required'],
        unique: true,
    },
    fullName:{
        type: String,
        default: ''
    },
    numberPhone: {
        type: String,
        required: [true, 'name numberPhone should be required'],
        unique: true,
    },
    address: {
        street: {type: String,  required: [true, 'street should be as required field']},
        country: {type: String, required: [true, 'country should be as required field']},
        city:{type: String, required: [true, 'city should be as required field']}
    },
    age:{
        type:Number,
        required: [true, 'age field should be required']
    },
    createdAt: {
        type:Date,
        default: Date.now()
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;