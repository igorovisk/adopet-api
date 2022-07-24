const Joi = require("@hapi/joi");
const userSchema = Joi.object({
   name: Joi.string().min(3).required(),
   email: Joi.string().email().lowercase().required(),
   tel: Joi.string().min(6).required(),
   password: Joi.string().min(6).required(),
});

module.exports = {
   userSchema,
};
