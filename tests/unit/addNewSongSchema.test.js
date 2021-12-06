/* eslint-disable no-undef */
import 'jest';
import faker from 'faker';
import { newSongBody } from '../factories/generateNewSongObject';
import { addNewSongSchema } from '../../src/schemas/addNewSongSchema';

const { name, youtubeLink } = newSongBody;

describe('songService#isYoutubeLink', () => {
  it('should return error in case of name is not a string', () => {
    const input = { name: faker.datatype.number(), youtubeLink };

    const { error } = addNewSongSchema.validate(input);

    expect(error).toBeDefined();
  });

  it('should return error in case of name is empty', () => {
    const input = { name: '', youtubeLink };

    const { error } = addNewSongSchema.validate(input);

    expect(error).toBeDefined();
  });

  it('should return error in case of name is not provided', () => {
    const input = { youtubeLink };

    const { error } = addNewSongSchema.validate(input);

    expect(error).toBeDefined();
  });

  it('should return error in case of youtubeLink is not a string', () => {
    const input = { name, youtubeLink: faker.datatype.number() };

    const { error } = addNewSongSchema.validate(input);

    expect(error).toBeDefined();
  });

  it('should return error in case of youtubeLink is not a valid youtube link', () => {
    const input = { name, youtubeLink: faker.datatype.string() };

    const { error } = addNewSongSchema.validate(input);

    expect(error).toBeDefined();
  });

  it('should return error in case of youtubeLink is empty', () => {
    const input = { name, youtubeLink: '' };

    const { error } = addNewSongSchema.validate(input);

    expect(error).toBeDefined();
  });

  it('should return error in case of youtubeLink is not provided', () => {
    const input = { name };

    const { error } = addNewSongSchema.validate(input);

    expect(error).toBeDefined();
  });

  it('should return error in case of empty body', () => {
    const input = {};

    const { error } = addNewSongSchema.validate(input);

    expect(error).toBeDefined();
  });

  it('should not return error in case of valid params', () => {
    const input = { name, youtubeLink };

    const { error } = addNewSongSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
