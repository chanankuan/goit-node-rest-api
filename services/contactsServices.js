import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find(({ id }) => id === contactId) ?? null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) return null;

  const [removedContacts] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  const updatedContact = { ...contacts[index], ...body };
  contacts.splice(index, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatedContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
