import services from '../services/authServices.js';
import { HttpError, trycatch } from '../helpers/index.js';

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await services.getUser({ email });

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const newUser = await services.createUser({ email, password });

  return res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const verifyToken = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await services.getUser({ verificationToken });

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  await updateUser(user._id, { verificationToken: null });

  res.json({ message: 'Verification successful' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await services.getUser({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const isValidPassword = await user.isValidPassword(password);
  if (!isValidPassword) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const loggedInUser = await services.loginUser(user._id);

  return res.json({
    token: loggedInUser.token,
    user: {
      email: loggedInUser.email,
      subscription: loggedInUser.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id: userId } = req.user;
  await services.logoutUser(userId);
  res.status(204).json();
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  await services.updateUser(_id, { subscription });

  return res.json({
    message: 'Subscription has been updated successfully',
  });
};

const updateAvatar = async (req, res) => {
  const { _id: userId } = req.user;

  if (!req.file) throw HttpError(400, '"avatarURL" is a required field');
  const user = await services.updateUserAvatar(userId, req.file);

  res.json({ avatarURL: user.avatarURL });
};

export default {
  register: trycatch(register),
  verifyToken: trycatch(verifyToken),
  login: trycatch(login),
  getCurrent,
  logout,
  updateSubscription: trycatch(updateSubscription),
  updateAvatar: trycatch(updateAvatar),
};
