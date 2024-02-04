import { HttpError } from './index.js';

export const validateBody = (schema) => {
  const func = (req, _, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
      return;
    }

    next();
  };

  return func;
};
