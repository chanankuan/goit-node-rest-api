import jwt from 'jsonwebtoken';
import Jimp from 'jimp';
import fs from 'fs/promises';
import path from 'path';
import config from '../environment.js';
import { User } from '../models/user.js';
import { sendEmail, replacePlaceholders } from '../helpers/index.js';

const updateUser = (userId, body) =>
  User.findByIdAndUpdate(userId, body, { new: true });

const findOneUser = query => User.findOne(query);

const getUser = query => User.findOne(query);

const findUserById = userId => User.findById(userId);

const sendVerifyEmail = async body => {
  // Read the email template
  const templatePath = path.join(
    process.cwd(),
    'templates',
    'verification-email.html'
  );

  const emailTemplate = await fs.readFile(templatePath, 'utf-8');

  // Variables to pass to the template
  const emailVariables = {
    verificationLink: `${config.BASE_URL}/api/users/verify/${body.verificationToken}`,
  };

  // Replace placeholders with variables
  const emailContent = replacePlaceholders(emailTemplate, emailVariables);

  const verifyEmail = {
    to: body.email,
    subject: "You're almost done!",
    html: emailContent,
  };

  sendEmail(verifyEmail);
};

const createUser = async body => {
  const newUser = await User.create(body);

  // Read the email template
  const templatePath = path.join(
    process.cwd(),
    'templates',
    'verification-email.html'
  );

  const emailTemplate = await fs.readFile(templatePath, 'utf-8');

  // Variables to pass to the template
  const emailVariables = {
    verificationLink: `${config.BASE_URL}/api/users/verify/${newUser.verificationToken}`,
  };

  // Replace placeholders with variables
  const emailContent = replacePlaceholders(emailTemplate, emailVariables);

  const verifyEmail = {
    to: body.email,
    subject: "You're almost done!",
    html: emailContent,
  };

  sendEmail(verifyEmail);

  return newUser;
};

const loginUser = async userId => {
  const payload = {
    id: userId,
  };

  const token = jwt.sign(payload, config.SECRET_KEY, { expiresIn: '30d' });

  return updateUser(userId, { token });
};

const logoutUser = async userId => {
  await updateUser(userId, { token: '' });
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
  sendVerifyEmail,
  createUser,
  loginUser,
  logoutUser,
  updateUserAvatar,
};
