import mongoose, { mongo } from "mongoose";

const orderSchema=new mongoose.Schema({
    userId:{type:String},
    product:{type:Object}
});
export default mongoose.model.order||mongoose.model("orders",orderSchema);