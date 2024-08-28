import mongoose from "mongoose";

const assignedAssestSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    cdsid: {
      type: String,
    },
    location: {
      type: String,
    },
    asset_category: {
      type: String,
    },
    asset_type:{
      type:String
    },
    asset_id: {
      type: String,
    },
    project:{
      type : String ,
    }
  }, {
    timestamps: true
  });
  
const AssignedAssest = mongoose.model('AssignedAssist', assignedAssestSchema);
  
export default AssignedAssest;