import mongoose, { mongo } from "mongoose";

const categorySchema=new mongoose.Schema({
   category:{type:Array},
   sellerId:{type:String}
});
export default mongoose.model.category||mongoose.model("categories",categorySchema);