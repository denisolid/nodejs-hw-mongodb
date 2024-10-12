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
import { checkUserById } from '../services/checkUserById.js';
import { upload } from '../middlewares/multer.js';

const router = Router();
router.use(authenticate);
router.get('/', checkUserById, ctrlWrapper(getContactsController));
router.get('/:contactId', checkUserById, ctrlWrapper(getContactByIdController));
router.post(
  '/',
  checkUserById,
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:contactId',
  checkUserById,
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.put(
  '/:contactId',
  checkUserById,
  isValidId,
  upload.single('photo'),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  checkUserById,
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
