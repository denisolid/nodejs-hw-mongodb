import { readContacts } from '../utils/readContacts.js';

export const getAllContacts = async () => {
  try {
    const existingContacts = await readContacts();
    return existingContacts;
  } catch (error) {
    console.error('Error getting contacts:', error);
    throw error;
  }
};

console.log(await getAllContacts());
