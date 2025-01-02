import mongoose, { mongo } from "mongoose";

const productSchema=new mongoose.Schema({
    sellerId:{type:String},
    category:{type:String},
    pname:{type:String},
    price:{type:String},
    brand:{type:String},
    size:{type:Object},
    pimages:{type:Array}
});
export default mongoose.model.product||mongoose.model("product",productSchema);