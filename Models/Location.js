import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
    location :{
        type : [String] , 
        required : true
    }
  });
  
const Location = mongoose.model('location', LocationSchema);
  
export default Location;