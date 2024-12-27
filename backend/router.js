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

export default router;