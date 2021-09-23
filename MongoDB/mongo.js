var validator = require('validator');
const { get } = require('http');
const { getDefaultSettings } = require('http2');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/bhatt").then(() => console.log("connected")).catch((err) => console.log(err));

//Mongoose schema defines structure of the document

const playListShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase:true,
        minlength:2,
        trim:true            //to remove extra spaces
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

//Mongoose model is used to create,update,delete,read collections
//create collection
const playList = new mongoose.model("Playlist", playListShema);

// create document
const createDocument = async () => {
    try {
        const reactPlaylist = new playList({
            name: "Ritik",
            year: 3,
            branch: "entc",
            reg_no: 19496,
            email:"bhattritik21@gmail.com",
            active: true,

        })
        const react2Playlist = new playList({
            name: "abhishek",
            year: 3,
            branch: "entc",
            reg_no: 19471,
            email:"aks21@gmail.com",
            active: true,

        })
        const react3Playlist = new playList({
            name: "Gaurav",
            year: 3,
            branch: "mech",
            reg_no: 19460,
            email:"mistri21@gmail.com",
            active: true,

        })

        // const result = await reactPlaylist.save();  for inserting 1 document
        const result = await playList.insertMany([reactPlaylist,react2Playlist,react3Playlist]);
        console.log(result);
    } 
    catch (err) {
        console.log(err);
    }
}

createDocument();

const  getDocument = async() =>{
    try{//   const result = await  playList.find(); to find all docs
        // const result = await  playList.find({branch:"Mech"}).select({name: 1});
        // console.log(result);

        //operators 
        // const result = await  playList.find({reg_no:{$gt :19470}}).select({name: 1});                           greater than
        // const result = await  playList.find({branch:{$nin :["ENTC"]}}).select({name: 1});                       not in
        // const result = await  playList.find({$or:[{name:"Ritik"},{branch:"Mech"}]}).select({name: 1});          or     
        // const result = await  playList.find({reg_no:{$gt :19470}}).select({name: 1}).countDocuments();          count
        const result = await  playList.find({branch:"ENTC"}).select({name: 1}).sort({name:1});                     //sort
        // const result = await  playList.find({$and:[{name:"Ritik"},{branch:"Mech"}]}).select({name: 1});   
        console.log(result);
    }
catch{(err)=> console.log(err);}

}

// getDocument();

const updateDocument = async(_id)=>{
    try{
        const result = await playList.findByIdAndUpdate({_id},{        // or playList.updateOne({_id:_id})
            $set:{
                name:"Abhishek"
            }
        },{
            new:true
        });
        console.log(result);

    }
    catch(err){
        console.log(err);
    }
}

// updateDocument("6136ddac4c5e691e6865b5bb");       //pass wnique id in this whose document we want to update

const deleteDocument = async(_id)=>{
    try{
        const result = await playList.findByIdAndDelete({_id});     // or playList.DeleteOne({_id:_id})   
        console.log(result);

    }
    catch(err){
        console.log(err);
    }
 
}

// deleteDocument("6136ddac4c5e691e6865b5ba");


