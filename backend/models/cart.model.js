import mongoose, { mongo } from "mongoose";

const cartSchema=new mongoose.Schema({
    pname:{type:String},
    price:{type:String},
    pimages:{type:Array}
});
export default mongoose.model.cart||mongoose.model("cart",cartSchema);