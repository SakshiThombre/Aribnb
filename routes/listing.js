const express=require("express");
const router=express.Router();
const wrapAsync=require("../util/wrapAsync.js");
const {isOwner,isLoggedIn,validateListing}=require("../middleware.js");
const listingController = require("../controllers/listing");
const multer=require("multer");
const {storage}=require("../cloudconfig.js");
const upload=multer({storage});

//create new listing
router.get("/new",isLoggedIn,listingController.newFormRender);

// for search
router.get("/search", wrapAsync(listingController.FindDestination));


// edit from 
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.EditFormRender));

// delete listing
router.delete("/:id/delete",isLoggedIn,isOwner,wrapAsync(listingController.deletelisting));

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('image'), validateListing, wrapAsync(listingController.AddListing));

router.route("/:id")
    .get(wrapAsync(listingController.listingInDetail))
    .put(isLoggedIn,isOwner, upload.single('image'), validateListing,wrapAsync(listingController.editlisting));


module.exports=router;