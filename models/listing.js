const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const review=require("./review.js");
 
const listingSchema=new Schema({
     title:{
       type:String,
       required:true,
     },
     description:String,
     image: {
       url: {
        type: String,
        default:
          "https://img.freepik.com/free-photo/blur-field-texture_1160-907.jpg",
        set: (v) =>
          v === ""
            ? "https://img.freepik.com/free-photo/blur-field-texture_1160-907.jpg"
            : v,
        },
      filename: String,
    },
     price:Number,
     location:String,
     country:String,
     reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"Review",
      },
     ],
     Owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
     },
     types: {
      type:[String],
      required: true,
    },
});

// middleware handaling deletion(when we delete listing automatically delete reviews for the listing)
listingSchema.post("findOneAndDelete", async(listing)=>{
   if(listing){
    await review.deleteMany({_id: {$in: listing.reviews}});
   }
});

const listing = mongoose.model("listing", listingSchema);

module.exports =  listing;