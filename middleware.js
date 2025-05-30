const listing = require("./models/listing.js");
const review= require("./models/review.js");
const { reviewSchema,listingSchema } = require("./schema.js");
const ExpressError = require('./util/ExpressError'); 


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be login!");
        return res.redirect("/login"); 
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner=async(req,res,next)=>{
    let{id}=req.params;
     const newData=req.body;
     let data=await listing.findById(id);
     if(!data.Owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You dont't have permission to edit!");
       return res.redirect(`/listing/${id}`);
     }
     next();
}


// schema validation
module.exports.validateListing=(req,res,next)=>{
    if (typeof req.body.types === 'string') {
    req.body.types = [req.body.types];
    }
    let result=listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error);  
    }else{
        next();
    }
}


module.exports.validateReview = (req, res, next) => {
    const result = reviewSchema.validate(req.body);
    if (result.error) {
        return next(new ExpressError(400, result.error.details[0].message));
    }
    next();
};

module.exports.isReviewAuthor=async (req,res,next)=>{
    let{id,reviewId}=req.params;
     let data=await review.findById(reviewId);
     if(!data.author.equals(res.locals.currUser._id)){
        req.flash("error","You dont't have permission to delete!");
       return res.redirect(`/listing/${id}`);
     }
     next();
}