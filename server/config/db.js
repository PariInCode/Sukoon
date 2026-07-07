const mongoose = require("mongoose");
const config = require("config");

const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/sukoon");
        console.log("Mongodn connected");
        
    }
    catch(err){
        console.log("Mongodb not connected");
        console.error(err.message);
        process.exit(1);
        
    }
};

module.exports = connectDB;