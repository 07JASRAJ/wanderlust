const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const { required } = require("joi");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        filename: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    }
});


listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
