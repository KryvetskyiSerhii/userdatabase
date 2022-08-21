const Joi = require("joi");
const moviesSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().required(),
  year: Joi.number().required(),
  color: Joi.string().required(),
  duration: Joi.number().required(),
});
const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;
  const { error } = moviesSchema.validate(
    { title, director, year, color, duration },
    { abortEarly: false }
  );
  if (error) res.status(422).json({ validationErrors: error.details });
  else next();
};

const userSchema = Joi.object({
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  city: Joi.string().max(255).required(),
  language: Joi.string().max(255).required(),
});
const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;
  const { error } = userSchema.validate(
    { firstname, lastname, email, city, language },
    { abortEarly: false }
  );
  if (error) res.status(422).json({ validationErrors: error.details });
  else next();
};

module.exports = { validateMovie, validateUser };
