import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactSchema } from '../validation/contacts.js';
import { updateContactSchema } from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.get(
  '/contacts',
  checkRoles(ROLES.USER),
  ctrlWrapper(getContactsController),
);
router.get(
  '/contacts/:contactId',
  checkRoles(ROLES.USER),
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/register',
  checkRoles(ROLES.USER),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/contacts/:contactId',
  checkRoles(ROLES.USER),
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.put(
  '/contacts/:contactId',
  checkRoles(ROLES.USER),
  isValidId,
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/contacts/:contactId',
  checkRoles(ROLES.USER),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));
export default router;
