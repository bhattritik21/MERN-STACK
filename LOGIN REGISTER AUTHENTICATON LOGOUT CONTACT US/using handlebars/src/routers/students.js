const express = require("express");
const router = new express.Router();
const Register = require("../models/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../autherntication/auth");
const Contact = require("../models/contact");

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/log", (req, res) => {
    res.render("login");
});

router.get("/user", auth, (req, res) => {
    res.render("user");
});

router.get("/contact", auth, (req, res) => {
    res.render("contact");
});

router.get("/logout", auth, async (req, res) => {
   
    try { 
        // to remove auth from single device

        // req.user.tokens = req.user.tokens.filter((currentElement)=>{  
        //  return currentElement.token !== req.token ;
        // })

        //to remove from all devices
        req.user.tokens=[];
        
        res.clearCookie('jwt');
        await req.user.save();
        res.render("login");

     }
    catch (e) { res.statue(401).send(e); }
})

router.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;

        if (password === cpassword) {
            const registerEmploy = new Register({
                userName: req.body.user,
                gender: req.body.gender,
                email: req.body.email,
                password: password

            })

            const token = await registerEmploy.generateAuthToken();  
            // console.log("the token is", token);

            res.cookie("jwt", token, {                         
                expires: new Date(Date.now() + 100000),
                httpOnly: true
            });

            console.log(cookie);

            const registered = await registerEmploy.save();
            res.status(201).render("about");
        }
        else {
            res.send("Password are not matching");
        }
    }
    catch (e) {
        res.send(e);
    }
})

router.post("/login", async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;

        const userEmail = await Register.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, userEmail.password);  // compares the password by converting it to hash
        const token = await userEmail.generateAuthToken();
        // console.log("the token is", token);

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 100000),
            httpOnly: true
        });

        if (isMatch) {
            res.status(201).render("about");
        }
        else {
            res.send("invalid login details");
        }

    }
    catch (e) {
        res.send("invalid login details");
    }
})

router.post("/contactus", auth, async(req, res) => {
   try{
      const contactData = new Contact(req.body);
      await contactData.save();
      res.status(201).render("about");
   }
   catch (e) { 
       res.status(500).send(e);
     }
});


router.get("/about", (req, res) => {
    res.render("about");
})


module.exports = router;