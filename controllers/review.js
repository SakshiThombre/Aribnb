const Reviewmodel = require("../models/review.js");
const listing = require("../models/listing.js");

module.exports.createReview=async (req, res) => {
    const listings = await listing.findById(req.params.id);
    console.log(listings);
    const newReview = new Reviewmodel(req.body.review);
    newReview.author=req.user._id;
    console.log(newReview);
    listings.reviews.push(newReview);
    await newReview.save();
    await listings.save();
    res.redirect(`/listing/${req.params.id}`);
}


module.exports.deleteReview=async (req, res) => {
    const { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Reviewmodel.findByIdAndDelete(reviewId);
     req.flash("success","Review  deleted!");
    res.redirect(`/listing/${id}`);
}