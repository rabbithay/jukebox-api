import './setup';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import * as songController from './controllers/song';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommendations', songController.addNewSong);

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  console.log({ error, request, response });
  return response.sendStatus(500);
});

export default app;
