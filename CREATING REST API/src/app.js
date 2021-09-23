const express = require("express");
const app = express();
require("./db/conn");

const studentRouter = require("./routers/students");

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(studentRouter);
app.listen(port, ()=>{
    console.log(`connection is set up at port ${port}`);
})


