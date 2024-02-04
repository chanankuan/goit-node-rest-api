import { HttpError, trycatch } from '../helpers/index.js';
import service from '../services/contactsServices.js';

const getAllContacts = async (req, res) => {
  const { page = 1, limit = 5, favorite } = req.query;
  const { _id: ownerId } = req.user;

  const skip = (Number(page) - 1) * Number(limit);

  const searchQuery = {
    owner: ownerId,
  };

  if (favorite) {
    searchQuery.favorite = favorite === 'true';
  }

  const contacts = await service.listContacts(searchQuery, { skip, limit });
  const total = await service.getCountDocuments(searchQuery);

  res.json({
    page: Number(page),
    total: total,
    per_page: Number(limit),
    contacts,
  });
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
  const { _id: ownerId } = req.user;

  const newContact = await service.addContact({ ...req.body, ownerId });
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
