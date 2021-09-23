const cookieParser = require("cookie-parser");
const { hasSubscribers } = require("diagnostics_channel");
const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");
require("./db/conn");
const registerRouter = require("./routers/students");
const port = process.env.PORT || 3000;


const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.use(registerRouter);
app.listen(port, ()=>{
    console.log(`connection is set up at port ${port}`);
})


