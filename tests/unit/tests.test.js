/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import 'jest';
import supertest from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/database';

//import * as Something from '../../src/path'

it('should return * in case of *', () => {
  // arrange
  const input = {}

  // act
  const result = Something.someFunction(input);

  // assert
  expect(result).matcher()
});

afterAll(() => {
  connection.end();
});
