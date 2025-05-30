const Joi=require("joi");

module.exports.listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  price: Joi.number().required().min(0),
  image: Joi.object({
    url: Joi.string().uri(),
    filename: Joi.string()
  }).optional(),
  types:Joi.array().items(Joi.string()).required(),
  contact: Joi.number().required(),
});

module.exports.reviewSchema= Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required()
    }).required()
});