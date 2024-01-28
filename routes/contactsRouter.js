import express from 'express';
import ctrl from '../controllers/contactsControllers.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';
import validateBody from '../helpers/validateBody.js';
import isValidId from '../helpers/isValidId.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrl.getAllContacts);

contactsRouter.get('/:id', isValidId, ctrl.getContactById);

contactsRouter.delete('/:id', isValidId, ctrl.deleteContact);

contactsRouter.post('/', validateBody(createContactSchema), ctrl.createContact);

contactsRouter.put(
  '/:id',
  validateBody(updateContactSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  validateBody(updateContactSchema),
  ctrl.updateStatusContact
);

export default contactsRouter;
