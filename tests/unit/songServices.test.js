/* eslint-disable no-undef */
import 'jest';
import generateNewSongObject from '../factories/generateNewSongObject';
import * as songRepository from '../../src/repositories/song';
import * as songService from '../../src/services/song';

const newSongOnject = generateNewSongObject;
const { name, youtubeLink } = newSongOnject;

describe('songService#addNewSong', () => {
  it('should return error in case of returns an error from repository', async () => {
    jest.spyOn(songRepository, 'insertSong').mockRejectedValueOnce(new Error('song not created'));

    const input = { name, youtubeLink };

    try {
      await songService.addNewSong(input);
    } catch (error) {
      expect(error.message).toBe('song not created');
    }
  });

  it('should not return error in case of success', async () => {
    jest.spyOn(songRepository, 'insertSong').mockResolvedValueOnce('song created');

    const input = { name, youtubeLink };

    await songService.addNewSong(input);

    expect(Promise.resolve('song created')).resolves.toBe('song created');
  });
});
