import { User } from '../models/user.js';

const updateUser = (userId, body) => User.findByIdAndUpdate(userId, body);

const findOneUser = (query) => User.findOne(query);

const findUserById = (userId) => User.findById(userId);

const createUser = (body) => User.create(body);

export { updateUser, findOneUser, findUserById, createUser };
