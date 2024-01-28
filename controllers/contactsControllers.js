import HttpError from '../helpers/HttpError.js';
import trycatch from '../helpers/trycatch.js';
import contactsService from '../services/contactsServices.js';

const getAllContacts = async (_, res) => {
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const contact = await contactsService.getContactById(req.params.id);

  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const contact = await contactsService.removeContact(req.params.id);

  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
};

const createContact = async (req, res, next) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const updatedContact = await contactsService.updateContact(id, body);

  if (!updatedContact) {
    return next(HttpError(404));
  }

  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const updatedContact = await contactsService.updateContact(id, body);

  if (!updatedContact) {
    return next(HttpError(404));
  }

  res.status(200).json(updatedContact);
};

export default {
  getAllContacts: trycatch(getAllContacts),
  getContactById: trycatch(getContactById),
  deleteContact: trycatch(deleteContact),
  createContact: trycatch(createContact),
  updateContact: trycatch(updateContact),
  updateStatusContact: trycatch(updateStatusContact),
};
