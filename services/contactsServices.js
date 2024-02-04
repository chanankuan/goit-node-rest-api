import { Contact } from '../models/contact.js';

const listContacts = (query, ownerId) => {
  const search = {
    owner: ownerId,
  };

  const options = {
    skip: query.skip,
    limit: query.limit,
  };

  if (query.favorite) {
    search.favorite = query.favorite;
  }

  return Contact.find(search, null, options);
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
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
