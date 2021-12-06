/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/database';
import { addSongIntoDatabaseReturningId } from '../factories/addSongIntoDatabase';
import { clearDatabase } from '../factories/clearDatabase';
import { newSongBody } from '../factories/generateNewSongObject';

beforeEach(async () => {
  clearDatabase();
});

const song = newSongBody;
const { name, youtubeLink } = song;

describe('POST /recommendations', () => {
  it('should answer with status 201 for valid params', async () => {
    const input = { name, youtubeLink };

    const response = await supertest(app).post('/recommendations').send(input);

    expect(response.status).toBe(201);
  });

  it('should answer with status 404 for invalid params', async () => {
    const input = { name, youtubeLink: 'invalid_link' };

    const response = await supertest(app).post('/recommendations').send(input);

    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await connection.end();
});
