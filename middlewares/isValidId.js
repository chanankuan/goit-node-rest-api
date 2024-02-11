import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/index.js';

export const isValidId = (req, _, next) => {
  if (!isValidObjectId(req.params.id)) {
    next(HttpError(404));
    return;
  }

  next();
};
