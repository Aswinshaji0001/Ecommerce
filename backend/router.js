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
router.route("/getuser").get(Auth,u.getUser)
router.route("/updateuser").post(Auth,u.updateUser)
router.route("/addaddress").post(Auth,u.addAddress)
router.route("/getaddress").get(Auth,u.getAddress)
router.route("/addcat").post(u.addCategory)
router.route("/getcat").get(Auth,u.getCategory)
router.route("/getproducts").get(Auth,u.getProduct)
router.route("/getpcat/:category").get(u.getCatProduct)
router.route("/getallproducts").get(Auth,u.getAllProducts);
router.route("/getproducte/:id").get(u.getProductE);
router.route("/editproduct/:id").put(u.editProduct);
router.route("/deletep/:id").delete(u.deleteProduct);
router.route("/addtocart").post(Auth,u.addToCart);
router.route("/getcart").get(Auth,u.getCart);
router.route("/deletecart/:id").delete(u.deleteCart);
router.route("/updatecart/:id").put(u.updateCart)
router.route("/clearcart").delete(Auth,u.clearCart)
router.route("/addtowishlist").post(Auth,u.addToWishlist)
router.route("/removefromwishlist/:productId").delete(Auth,u.removeFromWishlist)
router.route("/getwishlist").get(Auth,u.getWishlist);
router.route("/getorder/:id").get(u.getOrder);
router.route("/editquantity").post(Auth,u.editQuantity);
router.route("/addorder").post(Auth,u.addOrder);
router.route("/getorders").get(Auth,u.getOrders);

export default router;