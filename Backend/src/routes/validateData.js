const router = require("express").Router();
const Joi = require("joi");


const userSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
  });


  const formatJoiErrors = (error) => {
    return error.details.map((detail) => detail.message);
  };

  
  const validateRequest = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: formatJoiErrors(error) });
      }
      next();
    };
  };
  

  
  
  
  const getYearValidation = () => {
    return Joi.number()
      .integer()
      .min(1000)
      .max(new Date().getFullYear())
      .required();
  };
  
  // Update your Joi schemas
  const bookSchema = Joi.object({
    bookName: Joi.string().required(),
    url: Joi.string().required(),
    genre: Joi.string().required(),
    publishedYear: getYearValidation(),
    author: Joi.string().required(),
  }).unknown(false);
  
  const partialBookSchema = Joi.object({
    bookName: Joi.string(),
    url: Joi.string(),
    genre: Joi.string(),
    publishedYear: getYearValidation(),
    author: Joi.string(),
  })
    .min(1)
    .unknown(false);

  module.exports = {userSchema,validateRequest,formatJoiErrors,bookSchema,partialBookSchema} ;