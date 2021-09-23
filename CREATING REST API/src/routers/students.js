const express = require("express");
const router = new express.Router();
const Student = require("../models/student");

router.post("/students", async (req, res) => {
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }
    catch (e) {
        res.status(400).send(e);
    }
})

router.get("/students", async (req, res) => {
    try {
        const studentData = await Student.find({}).sort({"reg_no":1});
        res.status(200).send(studentData);
    }
    catch (e) {
        res.status(404).send(e);
    }
})
router.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const getData = await Student.findById(_id);
        res.status(200).send(getData);
    }
    catch (e) {
        res.status(404).send(e);
    }
})

router.patch("/student/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id,
            {new:true}
            )
        res.status(202).send(updateStudent);
    }
    catch (e) {
        res.status(401).send(e);
    }
})
router.delete("/student/:id", async (req, res) => {
    try {
        const deleteStudent =  await Student.findByIdAndDelete(_id,)
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }
    catch (e) {
        res.status(500).send(e);
    }
})
module.exports = router;