const validator = require("validator");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const contactSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error("Email is invalid");
        }
    },
    number:{
     type:Number,
     require:true,
     unique:true,
     min:10
    },
    message:{
        type:String,
        required:true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


const Contact = new mongoose.model("Contact", contactSchema);
module.exports =Contact;