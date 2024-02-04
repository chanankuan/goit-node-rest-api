import { Contact } from '../models/contact.js';

const getCountDocuments = (query) => {
  return Contact.countDocuments(query);
};

const listContacts = (query, options) => {
  return Contact.find(query, null, options).populate(
    'owner',
    'email subscription'
  );
};

const getContactById = (contactId, ownerId) => {
  return Contact.find({ _id: contactId, owner: ownerId });
};

const removeContact = (contactId, ownerId) => {
  return Contact.findOneAndDelete({ _id: contactId, owner: ownerId });
};

const addContact = (body) => {
  return Contact.create(body);
};

const updateContact = (contactId, body, ownerId) => {
  return Contact.findOneAndUpdate({ _id: contactId, owner: ownerId }, body, {
    new: true,
  });
};

const updateStatusContact = (contactId, body, ownerId) => {
  return Contact.findByIdAndUpdate({ _id: contactId, owner: ownerId }, body, {
    new: true,
  });
};

export default {
  getCountDocuments,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
