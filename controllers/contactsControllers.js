import { HttpError, trycatch } from '../helpers/index.js';
import service from '../services/contactsServices.js';

const getAllContacts = async (req, res) => {
  const { _id: ownerId } = req.user;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const favorite = req.query.favorite && req.query.favorite === 'true';
  const skip = (page - 1) * limit;

  const contacts = await service.listContacts(
    { skip, limit, favorite },
    ownerId
  );
  res.json({ page, total: 5, contacts });
};

const getContactById = async (req, res) => {
  const { id: contactId } = req.params;
  const { _id: ownerId } = req.user;

  const contact = await service.getContactById(contactId, ownerId);

  if (!contact) {
    throw HttpError(404);
  }

  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { id: contactId } = req.params;
  const { _id: ownerId } = req.user;

  const deletedContact = await service.removeContact(contactId, ownerId);

  if (!deletedContact) {
    throw HttpError(404);
  }

  res.json(deletedContact);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;

  const newContact = await service.addContact({ ...req.body, owner });
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id: contactId } = req.params;
  const { _id: ownerId } = req.user;
  const { body } = req;

  const updatedContact = await service.updateContact(contactId, body, ownerId);

  if (!updatedContact) {
    throw HttpError(404);
  }

  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { id: contactId } = req.params;
  const { _id: ownerId } = req.user;
  const { body } = req;

  const updatedContact = await service.updateContact(contactId, body, ownerId);

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
