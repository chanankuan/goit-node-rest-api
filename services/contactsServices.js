import { Contact } from '../models/contact.js';

const listContacts = () => Contact.find();

const getContactById = (contactId) => Contact.findById(contactId);

const removeContact = (contactId) => Contact.findByIdAndDelete(contactId);

const addContact = (body) => Contact.create(body);

const updateContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, body, { new: true });

const updateStatusContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, body, { new: true });

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
