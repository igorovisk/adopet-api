const Joi = require("@hapi/joi");
const petSchema = Joi.object({
   name: Joi.string().min(2).required(),
   owner: Joi.string().required(),
   description: Joi.string().min(20).required(),
});

module.exports = {
   petSchema,
};
