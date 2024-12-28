import mongoose, { mongo } from "mongoose";

const categorySchema=new mongoose.Schema({
    address:{type:Array},
    userId:{type:String}
});
export default mongoose.model.address||mongoose.model("address",addressSchema);