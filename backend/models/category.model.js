import mongoose, { mongo } from "mongoose";

const categorySchema=new mongoose.Schema({
   sellerId:{type:String},
   category:{type:String}
});
export default mongoose.model.category||mongoose.model("categories",categorySchema);