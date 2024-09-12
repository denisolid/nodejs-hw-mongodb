import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const removeLastContact = async () => {};
try {
  const contacts = await readContacts();
  if (contacts.length > 0) {
    contacts.length = contacts.length - 1;
    await writeContacts(contacts);
  }
} catch (error) {
  console.error('Error deleting last contact:', error);
  throw error;
}
removeLastContact();
