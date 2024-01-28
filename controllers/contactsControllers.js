import HttpError from '../helpers/HttpError.js';
import trycatch from '../helpers/trycatch.js';
import contactsService from '../services/contactsServices.js';

const getAllContacts = async (_, res) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;

  const contact = await contactsService.getContactById(id);

  if (!contact) {
    throw HttpError(404);
  }

  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  const deletedContact = await contactsService.removeContact(id);

  if (!deletedContact) {
    throw HttpError(404);
  }

  res.json(deletedContact);
};

const createContact = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const updatedContact = await contactsService.updateContact(id, body);

  if (!updatedContact) {
    throw HttpError(404);
  }

  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const updatedContact = await contactsService.updateContact(id, body);

  if (!updatedContact) {
    throw HttpError(404);
  }

  res.json(updatedContact);
};

export default {
  getAllContacts: trycatch(getAllContacts),
  getContactById: trycatch(getContactById),
  deleteContact: trycatch(deleteContact),
  createContact: trycatch(createContact),
  updateContact: trycatch(updateContact),
  updateStatusContact: trycatch(updateStatusContact),
};
