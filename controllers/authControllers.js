import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../environment.js';
import {
  findOneUser,
  createUser,
  updateUser,
} from '../services/authServices.js';
import { HttpError, trycatch } from '../helpers/index.js';

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await findOneUser({ email });

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await createUser({ email, password: hashPass });

  return res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findOneUser({ email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const isPassCorrect = await bcrypt.compare(password, user.password);

  if (!isPassCorrect) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, config.SECRET_KEY, { expiresIn: '30d' });

  await updateUser(user._id, { token });

  return res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await updateUser(_id, { token: '' });

  res.status(204).json();
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await updateUser(_id, { subscription });

  return res.json({
    message: 'Subscription has been updated successfully',
  });
};

export default {
  register: trycatch(register),
  login: trycatch(login),
  getCurrent,
  logout,
  updateSubscription: trycatch(updateSubscription),
};
