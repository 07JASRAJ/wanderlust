const Joi = require("joi");

//server side validation for listing schema
module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),

    description: Joi.string().required(),

    image: Joi.object({
        filename: Joi.string(),
        url: Joi.string().allow("", null),
    }),

    price: Joi.number().min(0).required(),

    location: Joi.string().required(),

    country: Joi.string().required(),
});

//server side validation for review schema
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required(),
    }).required(),
});
