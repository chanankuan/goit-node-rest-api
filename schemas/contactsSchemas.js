import Joi from 'joi';

const phoneRegex = new RegExp('^\\(\\d{3}\\) \\d{3}-\\d{4}$');

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required().pattern(phoneRegex).messages({
    'string.pattern.base': 'Phone must be in the format (XXX) XXX-XXXX',
  }),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string().pattern(phoneRegex).messages({
    'string.pattern.base': 'Phone must be in the format (XXX) XXX-XXXX',
  }),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages({
    'object.min': 'Body must have at least one field',
  });

export const updateContactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
