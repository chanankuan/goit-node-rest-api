import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import Jimp from 'jimp';
import fs from 'fs/promises';
import path from 'path';
import services from '../services/authServices.js';

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
    avatarURL: { type: String, default: '' },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    token: { type: String, default: '' },
  },
  { versionKey: false }
);

userSchema.pre('save', async function () {
  /**
   * generate hashed password
   * generate default user avatar
   */
  this.password = await bcrypt.hash(this.password, 10);
  this.avatarURL = gravatar.url(this.email);
});

userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// userSchema.methods.updateAvatar = async function () {
//   // resize avatar
//   const image = await Jimp.read(tempUpload);
//   image.resize(250, 250).write(tempUpload);

//   const avatarsDir = path.join(process.cwd(), 'public', 'avatars');
//   const filename = `${_id}_${originalname}`;
//   const resultUpload = path.join(avatarsDir, filename);
//   await fs.rename(tempUpload, resultUpload);

//   const avatarURL = path.join('avatars', filename);
//   await services.updateUser(_id, { avatarURL });
// };

export const User = model('User', userSchema);
