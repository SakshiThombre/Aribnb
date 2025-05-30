const User=require("../models/user.js");

module.exports.signUpFormRender=(req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.SignUp=async (req,res)=>{
   try {
    let {username,email,password}=req.body;
    const newUser= new User({email,username});
    const registerUser=await User.register(newUser,password);
    console.log(registerUser);
    req.login(registerUser,(err)=>{
         if(err){
            return next(err);
         }
         req.flash("success","Welcom to Wanderlust!");
         res.redirect("/listing");
    });
   } catch (e) {
      req.flash("error",e.message);
      res.render("./users/signup.ejs");
   }
}

module.exports.loginFormRender=(req,res)=>{
   res.render("./users/login.ejs");
}

module.exports.login=async(req,res)=>{
   req.flash("success","Welcome to Wonderlust!");
   const redirectUrl=res.locals.redirectUrl || "/listing";
   res.redirect(redirectUrl);
   
}

module.exports.logout=(req,res,next)=>{
   req.logout((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","You are logged Out!");
      res.redirect("/listing");
   })
}