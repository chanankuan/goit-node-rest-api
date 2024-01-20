import validateBody from '../helpers/validateBody.js';
import { createContactSchema } from '../schemas/contactsSchemas.js';
import contactsService from '../services/contactsServices.js';

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();

  res.status(200).json(contacts);
};

export const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);

  if (!contact) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id);

  if (!contact) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  res.status(200).json(contact);
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await contactsService.addContact(name, email, phone);

  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updatedContact = await contactsService.updateContact(id, body);

  res.status(201).json(updatedContact);
};

// {
//     "name": "Anton Chan",
//     "email": "abc@abc.com",
//     "phone": "(242) 124-8176"
// }
