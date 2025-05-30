const express=require("express");
const router=express.Router();
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const userController=require("../controllers/user.js");

router.route("/signup")
   .get(userController.signUpFormRender)
   .post(userController.SignUp);

router.route("/login")
 .get(userController.loginFormRender)
 .post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userController.login);

router.get("/logout",userController.logout);

module.exports=router;