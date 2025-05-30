if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}

const express=require("express");
const app= express();
const mongoose= require("mongoose");
const listing = require("./models/listing.js");
const review=require("./models/review.js");
const path=require("path");
const session=require("express-session");
const flash=require("connect-flash");
const ejsMate=require("ejs-mate");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
app.engine('ejs',ejsMate);
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
const methodOverride = require('method-override');
const wrapAsync=require("./util/wrapAsync.js");
app.use(methodOverride('_method'));
app.use(express.static('public'));
const listings=require("./routes/listing.js");
const reviews=require("./routes/reviews.js");
const userRoute=require("./routes/user.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wonderlust";

const {Review}=require("./schema.js");
main()
    .then(()=>{
        console.log("connnected to db");
    })
    .catch((err)=>{
    console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.listen(8080,()=>{
   console.log("server is listening to port");
});

const sessionOptions ={
    secret:process.env.SECRET,
     resave:false,
     saveUninitialized:true,
     cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
     },
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});



app.use("/listing",listings);
app.use("/listing/:id/reviews",reviews);
app.use("/",userRoute);

app.all("/*splat", (req, res, next) => {
    next(new ExpressError( 404,"Page Not Found"));
});

// middleware
app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
    res.render("error.ejs",{err});
    console.log(err);
});
