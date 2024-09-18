import { StudentsCollection } from '../db/models/students.js';

export const getAllStudents = async () => {
  const contacts = await StudentsCollection.find();
  return contacts;
};

export const getStudentById = async (contactId) => {
  const contact = await StudentsCollection.findById(contactId);
  return contact;
};
