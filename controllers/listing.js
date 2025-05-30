const listing = require("../models/listing");

module.exports.FindDestination = async (req, res) => {
    let destination = req.query.destination;
    if (!destination || typeof destination !== "string" || destination.trim() === "") {
        req.flash("error", "Provide valid City!");
    }

    const alllistings= await listing.find({
        location: { $regex:destination, $options: "i" } // case-insensitive search
    });

    if (alllistings.length === 0) {
       req.flash("error", "No results found for this destination.");
       res.redirect("/listing");
    }

    // You can render a page or return JSON
    res.render("listings/index", { alllistings });
};

module.exports.index = async (req, res) => {
    const { type } = req.query;
    let alllistings;
    if (type) {
        // Filter listings by type
        alllistings = await listing.find({ types: type });
        const isEmpty = alllistings.length === 0;
        if (isEmpty) {
            req.flash("success", `Not found any ${type}  destination`);
            res.redirect("/listing");
        }
    } else {
        // No type provided, show all listings
        alllistings = await listing.find({});
    }
    res.render("listings/index", { alllistings, selectedType: type || "All" });

}

module.exports.newFormRender = (req, res) => {
    res.render("listings/addnewlist.ejs");
}

module.exports.listingInDetail = async (req, res) => {
    let { id } = req.params;
    const data = await listing.findById(id).populate({
        path: "reviews", populate: {
            path: "author",
        }
    }).populate("Owner");
    if (!data) {
        req.flash("error", "Listing you reuqested for display does not exist!");
        res.redirect("/listing");
    }
    res.render("listings/listshow", { data });
}


module.exports.AddListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const { title, description, image, price, location, country, types ,contact} = req.body;
    const data = new listing({
        title,
        contact,
        description,
        image,
        price,
        location,
        country,
        types,
    });
    data.Owner = req.user._id;
    if (!data) {
        throw new ExpressError(400, "send valid data");
    }
    data.image = { url, filename };
    await data.save();
    console.log(data);
    req.flash("success", "Added new listing !");
    res.redirect("/listing");

}


module.exports.EditFormRender = async (req, res) => {
    let { id } = req.params;
    const data = await listing.findById(id);
    // using cloudinary API blure img
    let originalImageUrl = data.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/listedit.ejs", { data, originalImageUrl });
}

module.exports.editlisting = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
        const existingListing = await listing.findById(id);
        if (!existingListing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listing");
        }

        // If a new file is uploaded, use its path and filename
        if (req.file) {
            newData.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        } else {
            // Retain the old image if no new image is uploaded
            newData.image = existingListing.image;
        }

        await listing.findByIdAndUpdate(id, newData, {
            new: true,
            runValidators: true
        });

        req.flash("success", "Listing Edited!");
        res.redirect("/listing");
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong while editing the listing.");
        res.redirect("/listing");
    }
};

module.exports.deletelisting = async (req, res) => {
    let { id } = req.params;
    const data = await listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listing");
}


