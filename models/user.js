import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
  },
  { versionKey: false }
);

/**
 * Define a post hook for the document
 */
// userSchema.post('save', (error, _, next) => {
//   const { code, name } = error;

//   if (code === 11000 && name === 'MongoServerError') {
//     error.status = 409;
//     error.message = 'Email in use';
//   } else {
//     error.status = 400;
//   }

//   next();
// });

export const User = model('User', userSchema);
