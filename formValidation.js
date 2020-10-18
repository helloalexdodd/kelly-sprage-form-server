const Joi = require('joi');

const joiValidator = (req) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    message: Joi.string().required(),
  });
  return schema.validate(req);
};

const validate = (validator) => (req, res, next) => {
  const { error } = validator(req.body);
  if (error) return res.status(400).send(error);
  next();
};

module.exports = { joiValidator, validate };
