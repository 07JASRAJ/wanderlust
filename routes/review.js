const express = require("express");
const router = express.Router({ mergeParams: true });
//const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
//const Review = require("../models/review");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

const reviewController = require("../controllers/reviews");

//Review Routes
//Create Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Delete Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;
