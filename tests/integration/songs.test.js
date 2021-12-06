/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/database';
import { addSongIntoDatabaseReturningId } from '../factories/addSongIntoDatabase';
import { clearDatabase } from '../factories/clearDatabase';
import { newSongBody } from '../factories/generateNewSongObject';

beforeEach(async () => {
  await clearDatabase();
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

describe('POST /recommendations/:id/upvote', () => {
  it('should answer with status 200 for valid id', async () => {
    const id = await addSongIntoDatabaseReturningId();

    const response = await supertest(app).post(`/recommendations/${id}/upvote`);

    expect(response.status).toBe(200);
  });

  it('should answer with status 404 for invalid id', async () => {
    const response = await supertest(app).post(`/recommendations/${NaN}/upvote`);

    expect(response.status).toBe(404);
  });
});

describe('POST /recommendations/:id/downvote', () => {
  it('should answer with status 200 for valid id', async () => {
    const id = await addSongIntoDatabaseReturningId();

    const response = await supertest(app).post(`/recommendations/${id}/downvote`);

    expect(response.status).toBe(200);
  });

  it('should answer with status 404 for invalid id', async () => {
    const response = await supertest(app).post(`/recommendations/${NaN}/downvote`);

    expect(response.status).toBe(404);
  });
});

describe('GET /recommendations/random', () => {
  describe('when there is music registered', () => {
    describe('when asks for lower rating recommendation should return status 200 and', () => {
      it('should send a lower rating music when there is lower rating music registered', async () => {
        await addSongIntoDatabaseReturningId(5);
        await addSongIntoDatabaseReturningId(11);

        jest.spyOn(global.Math, 'random').mockReturnValue(0.29);

        const response = await supertest(app).get('/recommendations/random');

        expect(response.status).toBe(200);
        expect(response.body.score).toEqual(5);
      });

      it('should send a higher rating music when there is not lower rating music registered', async () => {
        await addSongIntoDatabaseReturningId(11);

        jest.spyOn(global.Math, 'random').mockReturnValue(0.30);

        const response = await supertest(app).get('/recommendations/random');

        expect(response.status).toBe(200);
        expect(response.body.score).toEqual(11);
      });
    });

    describe('when asks for higher rating recommendation should return status 200 and', () => {
      it('should send a higher rating music when there is higher rating music registered', async () => {
        await addSongIntoDatabaseReturningId(9);
        await addSongIntoDatabaseReturningId(11);

        jest.spyOn(global.Math, 'random').mockReturnValue(0.31);

        const response = await supertest(app).get('/recommendations/random');

        expect(response.status).toBe(200);
        expect(response.body.score).toEqual(11);
      });

      it('should send a lower rating music when there is not higher rating music registered', async () => {
        await addSongIntoDatabaseReturningId(-4);

        jest.spyOn(global.Math, 'random').mockReturnValue(0.99);

        const response = await supertest(app).get('/recommendations/random');

        expect(response.status).toBe(200);
        expect(response.body.score).toEqual(-4);
      });
    });
  });

  describe('when there is not music registered', () => {
    it('should return status 404', async () => {
      const response = await supertest(app).get('/recommendations/random');

      expect(response.status).toBe(404);
    });
  });
});

describe('GET /recommendations/top/:amount', () => {
  it('should answer with status 200 in case of valid amount value', async () => {
    await addSongIntoDatabaseReturningId(15);
    await addSongIntoDatabaseReturningId(9);
    await addSongIntoDatabaseReturningId(3);
    await addSongIntoDatabaseReturningId(-3);

    const amount = 2;

    const response = await supertest(app).get(
      `/recommendations/top/${amount}`,
    );

    expect(response.status).toBe(200);
    expect(response.body[0].score).toEqual(15);
    expect(response.body[1].score).toEqual(9);
  });

  it('should answer with status 200 in case of valid amount value', async () => {
    await addSongIntoDatabaseReturningId(15);
    await addSongIntoDatabaseReturningId(9);

    const amount = 3;

    const response = await supertest(app).get(
      `/recommendations/top/${amount}`,
    );

    expect(response.status).toBe(200);
    expect(response.body[0].score).toEqual(15);
    expect(response.body[1].score).toEqual(9);
  });

  it('should answer with status 404 in case of invalid amount value', async () => {
    await addSongIntoDatabaseReturningId(15);
    await addSongIntoDatabaseReturningId(9);
    await addSongIntoDatabaseReturningId(3);
    await addSongIntoDatabaseReturningId(-3);

    const amount = NaN;

    const response = await supertest(app).get(
      `/recommendations/top/${amount}`,
    );

    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await connection.end();
});
