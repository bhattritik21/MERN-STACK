const validator = require("validator");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // uppercase:true,
        // minlength:2,
        // trim:true            //to remove extra spaces
    },
    year: Number,
    branch:{
        type:String,
        required: true,
        lowercase:true,
        // enum:["entc,mech"]    // it will throw error if any ther branch name is given
    } ,
    reg_no:{
        type:  Number,
        required: true,
        unique:true,
        validate(value){                                            //custom validator
            if(value<0){
                throw new Error("reg no. cnt be negative");                
            }
        }
    },
    active: Boolean,
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
               throw new Error("Email is invalid");
        }

    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Student = new mongoose.model("Studentsapi",studentSchema);
module.exports = Student;