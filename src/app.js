import './setup';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import * as exampleController from './controllers/example';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/route', exampleController.example1);

app.post('/route', exampleController.example2);

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  console.log({ error, request, response });
  return response.sendStatus(500);
});

export default app;
