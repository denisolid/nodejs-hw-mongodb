import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getContactsController));
contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);
contactsRouter.post('/contacts', ctrlWrapper(createContactController));
contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactController),
);

contactsRouter.put(
  '/contacts/:contactId',
  ctrlWrapper(upsertContactController),
);
export default contactsRouter;
