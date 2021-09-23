const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    // lastName: {
    //     type: String,
    //     required: true,
    // },
    gender: {
        type: String,
        required: true
    },
    // age:{
    //     type: Number,
    //     required: true
    // },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error("Email is invalid");
        }
    },
    password: {
        type: String,
        required: true
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

studentSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, "Leonidas00756");
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    }
    catch (error) {
        res.send(`The error part ${error}`);
    }
}

studentSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        // console.log(this.password);
    }

    next();
})

const Register = new mongoose.model("Regsiter", studentSchema);
module.exports = Register;