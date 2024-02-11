import express from 'express';
import controllers from '../controllers/contactsControllers.js';
import {
  createContactSchema,
  updateContactFavoriteSchema,
  updateContactSchema,
} from '../schemas/index.js';
import { authenticate, isValidId, validateBody } from '../middlewares/index.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', controllers.getAllContacts);

contactsRouter.get('/:id', isValidId, controllers.getContactById);

contactsRouter.delete('/:id', isValidId, controllers.deleteContact);

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  controllers.createContact
);

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(updateContactSchema),
  controllers.updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  validateBody(updateContactFavoriteSchema),
  controllers.updateStatusContact
);

export default contactsRouter;
