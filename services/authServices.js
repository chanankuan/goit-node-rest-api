import { User } from '../models/user.js';

const findOneUser = (query) => User.findOne(query);

const findUserById = (userId) => User.findById(userId);

const createUser = (body) => User.create(body);

export { findOneUser, findUserById, createUser };
