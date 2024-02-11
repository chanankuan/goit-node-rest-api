import jwt from 'jsonwebtoken';
import Jimp from 'jimp';
import fs from 'fs/promises';
import path from 'path';
import config from '../environment.js';
import { User } from '../models/user.js';

const updateUser = (userId, body) =>
  User.findByIdAndUpdate(userId, body, { new: true });

const findOneUser = (query) => User.findOne(query);

const getUser = (query) => User.findOne(query);

const findUserById = (userId) => User.findById(userId);

const createUser = (body) => User.create(body);

const loginUser = async (userId) => {
  const payload = {
    id: userId,
  };

  const token = jwt.sign(payload, config.SECRET_KEY, { expiresIn: '30d' });

  return User.findByIdAndUpdate(userId, { token }, { new: true });
};

const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { token: '' });
};

const updateUserAvatar = async (userId, fileData) => {
  const { path: tempUpload, originalname } = fileData;

  // resize avatar
  const image = await Jimp.read(tempUpload);
  image.resize(250, 250).write(tempUpload);

  const avatarsDir = path.join(process.cwd(), 'public', 'avatars');
  const filename = `${userId}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join('avatars', filename);
  return updateUser(userId, { avatarURL });
};

export default {
  updateUser,
  findOneUser,
  getUser,
  findUserById,
  createUser,
  loginUser,
  logoutUser,
  updateUserAvatar,
};
