import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .required()
    .pattern(new RegExp('^\\(\\d{3}\\) \\d{3}-\\d{4}$'))
    .messages({
      'string.pattern.base': 'Phone must be in the format (XXX) XXX-XXXX',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string()
    .pattern(new RegExp('^\\(\\d{3}\\) \\d{3}-\\d{4}$'))
    .messages({
      'string.pattern.base': 'Phone must be in the format (XXX) XXX-XXXX',
    }),
})
  .min(1)
  .messages({
    'object.min': 'Body must have at least one field',
  });
