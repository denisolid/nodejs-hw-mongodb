// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllStudents, getStudentById } from './services/students.js';
const PORT = Number(env('PORT', '3000'));
export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });
  app.get('/contacts', async (req, res) => {
    const contacts = await getAllStudents();
    console.log(contacts);

    res.status(200).json({
      message: 'Successfully found contacts!',
      data: contacts,
      status: 200,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getStudentById(contactId);

    if (!contact) {
      res.status(404).json({
        message: `Contact not found ${contactId}`,
        status: 404,
      });
      return;
    }

    res.status(200).json({
      data: contact,
      message: `Successfully found contact with id ${contactId}!`,
      status: 200,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
      status: 404,
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
      status: 500,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
