import { Router } from "express";
import * as u from './requestHandler.js'
import Auth from './middleware/Auth.js'
const router=Router();
router.route("/signin").post(u.signIn);
router.route("/signup").post(u.signUp);
router.route("/verify").post(u.verifyMail);
router.route("/home").get(Auth,u.Home);
router.route("/seller").get(Auth,u.Seller);
router.route("/editseller").post(Auth,u.editSeller);
router.route("/getseller").get(Auth,u.getSeller)
router.route("/addproduct").post(u.addProduct)
router.route("/adduser").post(Auth,u.addUser)
router.route("/getuser").get(Auth,u.getUser)
router.route("/updateuser").put(Auth,u.updateUser)
router.route("/addaddress").post(Auth,u.addAddress)
router.route("/addcat").post(u.addCategory)
router.route("/getcat").get(Auth,u.getCategory)
router.route("/getproducts").get(Auth,u.getProduct)
router.route("/getpcat/:category").get(u.getCatProduct)
router.route("/getallproducts").get(Auth,u.getAllProducts);
router.route("/getproducte/:id").get(u.getProductE);
router.route("/editproduct/:id").put(u.editProduct);
router.route("/deletep/:id").delete(u.deleteProduct);






export default router;