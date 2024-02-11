import Joi from 'joi';

const emailRegex = new RegExp('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
const subscriptionOptions = ['starter', 'pro', 'business'];

export const registerSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegex).messages({
    'string.pattern.base': 'Incorrect email format',
    'string.empty': '"email" cannot be an empty field',
    'any.required': '"email" is a required field',
  }),
  password: Joi.string().required().min(6).messages({
    'string.empty': '"password" cannot be an empty field',
    'string.min': '"password" should have a minimum length of 6',
    'any.required': '"password" is a required field',
  }),
  subscription: Joi.string().valid(...subscriptionOptions),
});

export const loginSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegex).messages({
    'string.pattern.base': 'Incorrect email format',
    'string.empty': '"email" cannot be an empty field',
    'any.required': '"email" is a required field',
  }),
  password: Joi.string().required().messages({
    'string.empty': '"password" cannot be an empty field',
    'any.required': '"password" is a required field',
  }),
});

export const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .valid(...subscriptionOptions),
});

export const avatarURLSchema = Joi.object({
  avatarURL: Joi.required().messages({
    'any.required': '"avatarURL" is a required field',
  }),
});
