import Joi from 'joi';

const emailRegex = new RegExp('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$');

export const registerSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegex).messages({
    'string.pattern.base': 'Incorrect email format',
  }),
  password: Joi.string().required().min(6),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

export const loginSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegex).messages({
    'string.pattern.base': 'Incorrect email format',
  }),
  password: Joi.string().required(),
});
