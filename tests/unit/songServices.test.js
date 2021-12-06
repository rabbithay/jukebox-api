/* eslint-disable no-undef */
import 'jest';
import { songBody } from '../factories/generateCreatedSongObject';
import * as songRepository from '../../src/repositories/song';
import * as songService from '../../src/services/song';

const {
  id, name, youtubeLink,
} = songBody;

describe('#addNewSong', () => {
  it('should return error in case of returns an error from repository', async () => {
    jest.spyOn(songRepository, 'insertSong').mockRejectedValueOnce(new Error('song not created'));

    const input = { name, youtubeLink };

    try {
      await songService.addNewSong(input);
    } catch (error) {
      expect(error.message).toBe('song not created');
    }
  });

  it('should add a song in case of success', async () => {
    const insertSongSpy = jest.spyOn(songRepository, 'insertSong').mockImplementationOnce(async () => 'song added');

    const input = { name, youtubeLink };

    const result = await songService.addNewSong(input);

    expect(insertSongSpy).toHaveBeenCalled();
    expect(result).toBe('song added');
  });
});

describe('#checkSongExist', () => {
  it('should return error in case of returns an error from repository', async () => {
    jest.spyOn(songRepository, 'getSongById').mockRejectedValueOnce(new Error('unsolved'));

    const input = { id: Number() };

    try {
      await songService.checkSongExist(input);
    } catch (error) {
      expect(error.message).toBe('unsolved');
    }
  });

  it('should return true in case of song exist', async () => {
    const getSongByIdSpy = jest.spyOn(songRepository, 'getSongById').mockImplementationOnce(async () => true);

    const input = { id };

    const result = await songService.checkSongExist(input);

    expect(getSongByIdSpy).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it('should return false in case of song exist', async () => {
    const getSongByIdSpy = jest.spyOn(songRepository, 'getSongById').mockImplementationOnce(async () => undefined);

    const input = { id };

    const result = await songService.checkSongExist(input);
    expect(getSongByIdSpy).toHaveBeenCalled();
    expect(result).toBeFalsy();
  });
});

describe('#updateScore', () => {
  describe('when is up vote', () => {
    it('should return error in case of returns an error from repository', async () => {
      jest.spyOn(songRepository, 'updateScore').mockRejectedValueOnce(new Error('song does not exist'));

      const input = { id, vote: 'up' };

      try {
        await songService.updateScore(input);
      } catch (error) {
        expect(error.message).toBe('song does not exist');
      }
    });

    it('should vote in case of success', async () => {
      const updateScoreSpy = jest.spyOn(songRepository, 'updateScore').mockImplementationOnce(async () => 'voted');

      const input = { id, vote: 'up' };

      const result = await songService.updateScore(input);

      expect(updateScoreSpy).toHaveBeenCalled();
      expect(result).toBe('voted');
    });
  });

  describe('when is down vote', () => {
    it('should return error in case of returns an error from repository', async () => {
      jest.spyOn(songRepository, 'getSongById').mockRejectedValueOnce(new Error('song does not exist'));

      const input = { id, vote: 'down' };

      try {
        await songService.updateScore(input);
      } catch (error) {
        expect(error.message).toBe('song does not exist');
      }
    });

    it('should delete the song in case of score = -4', async () => {
      jest.spyOn(songRepository, 'getSongById').mockImplementationOnce(async () => ({ song_score: -4 }));
      const deleteSongSpy = jest.spyOn(songRepository, 'deleteSong').mockImplementationOnce(async () => 'deleted');

      const input = { id, vote: 'down' };

      const result = await songService.updateScore(input);

      expect(deleteSongSpy).toHaveBeenCalled();
      expect(result).toBe('deleted');
    });

    it('should delete the song in case of score = -5', async () => {
      jest.spyOn(songRepository, 'getSongById').mockImplementationOnce(async () => ({ song_score: -5 }));
      const deleteSongSpy = jest.spyOn(songRepository, 'deleteSong').mockImplementationOnce(async () => 'deleted');

      const input = { id, vote: 'down' };

      const result = await songService.updateScore(input);

      expect(deleteSongSpy).toHaveBeenCalled();
      expect(result).toBe('deleted');
    });

    it('should vote in case of score = -3', async () => {
      jest.spyOn(songRepository, 'getSongById').mockImplementationOnce(async () => ({ song_score: -3 }));
      const deleteSongSpy = jest.spyOn(songRepository, 'deleteSong').mockImplementationOnce(async () => 'deleted');
      const updateScoreSpy = jest.spyOn(songRepository, 'updateScore').mockImplementationOnce(async () => 'voted');

      const input = { id, vote: 'down' };

      const result = await songService.updateScore(input);

      expect(deleteSongSpy).not.toHaveBeenCalled();
      expect(updateScoreSpy).toHaveBeenCalled();
      expect(result).toBe('voted');
    });
  });
});

describe('#getRandomRecommendation', () => {
  it('should return error in case of returns an error from repository', async () => {
    jest.spyOn(songRepository, 'getRecommendation').mockRejectedValueOnce(new Error('recommendation not selected'));

    try {
      await songService.getRandomRecommendation();
    } catch (error) {
      expect(error.message).toBe('recommendation not selected');
    }
  });

  describe('when gets lower rating recommendation', () => {
    it('should return lower recommendation if there is lower recommendation', async () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.3);
      jest.spyOn(songRepository, 'getRecommendation')
        .mockImplementationOnce(async () => 'lower recommendation')
        .mockImplementationOnce(async () => 'any recommendation');

      const result = await songService.getRandomRecommendation();

      expect(result).toBe('lower recommendation');
    });

    it('should return any recommendation if there is no lower recommendation', async () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.29);
      jest.spyOn(songRepository, 'getRecommendation')
        .mockImplementationOnce(async () => undefined)
        .mockImplementationOnce(async () => 'any recommendation');

      const result = await songService.getRandomRecommendation();

      expect(result).toBe('any recommendation');
    });
  });

  describe('when gets higher rating recommendation', () => {
    it('should return higher recommendation if there is higher recommendation', async () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.31);
      jest.spyOn(songRepository, 'getRecommendation')
        .mockImplementationOnce(async () => 'higher recommendation')
        .mockImplementationOnce(async () => 'any recommendation');

      const result = await songService.getRandomRecommendation();

      expect(result).toBe('higher recommendation');
    });

    it('should return any recommendation if there is no higher recommendation', async () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(1);
      jest.spyOn(songRepository, 'getRecommendation')
        .mockImplementationOnce(async () => undefined)
        .mockImplementationOnce(async () => 'any recommendation');

      const result = await songService.getRandomRecommendation();

      expect(result).toBe('any recommendation');
    });
  });
});

describe('#getListOfTopSongs', () => {

});
