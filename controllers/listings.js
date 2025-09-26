const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    let listings = await Listing.find();
    res.render("./listings/index", { listings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new");
};

module.exports.showListing = async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    } else {
        res.render("./listings/show", { listing });
    }
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let listing = new Listing(req.body);
    listing.owner = req.user._id;
    listing.image.url = url;
    listing.image.filename = filename;
    await listing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");


    // await Listing.create(req.body);
    // res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }

    let currentImageUrl = listing.image.url;
    currentImageUrl = currentImageUrl.replace("/upload", "/upload/w_250");

    res.render("./listings/edit", { listing, currentImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });

    if(req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image.url = url;
        listing.image.filename = filename;
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let id = req.params.id;
    let deletedListing = await Listing.findByIdAndDelete(id);
    //console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
