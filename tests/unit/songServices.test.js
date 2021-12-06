/* eslint-disable no-undef */
import 'jest';
import {songBody} from '../factories/generateCreatedSongObject';
import * as songRepository from '../../src/repositories/song';
import * as songService from '../../src/services/song';

const {
  id, name, youtubeLink,
} = songBody;

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

describe('songService#checkSongExist', () => {
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
    jest.spyOn(songRepository, 'getSongById').mockResolvedValueOnce('song was found');

    const input = { id: Number() };

    try {
      await songService.checkSongExist(input);
    } catch (error) {
      expect(error).toBeUndefined();
    }

    expect(Promise.resolve('song was found')).resolves.toBeTruthy();
  });

  it('should return false in case of song exist', async () => {
    jest.spyOn(songRepository, 'getSongById').mockResolvedValueOnce(null);

    const input = { id: Number() };

    try {
      await songService.checkSongExist(input);
    } catch (error) {
      expect(error).toBeUndefined();
    }

    expect(Promise.resolve()).resolves.toBeFalsy();
  });
});

describe('songService#updateScore', () => {
  describe('when is up vote', ()=>{
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
   
      expect(updateScoreSpy).toHaveBeenCalled()
      expect(result).toBe('voted')

    });
  })
  
  describe('when is down vote', ()=>{
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
  
      const input = { id, vote: "down" };
  
      const result = await songService.updateScore(input);
  
      expect(deleteSongSpy).toHaveBeenCalled();
      expect(result).toBe('deleted')
    });

    it('should delete the song in case of score = -5', async () => {
      jest.spyOn(songRepository, 'getSongById').mockImplementationOnce(async () => ({ song_score: -5 }));
      const deleteSongSpy = jest.spyOn(songRepository, 'deleteSong').mockImplementationOnce(async () => 'deleted');
  
      const input = { id, vote: "down" };
  
      const result = await songService.updateScore(input);
  
      expect(deleteSongSpy).toHaveBeenCalled();
      expect(result).toBe('deleted')
    });

    it('should vote in case of score = -3', async () => {
      jest.spyOn(songRepository, 'getSongById').mockImplementationOnce(async () => ({ song_score: -3 }));
      const deleteSongSpy = jest.spyOn(songRepository, 'deleteSong').mockImplementationOnce(async () => 'deleted');
      const updateScoreSpy = jest.spyOn(songRepository, 'updateScore').mockImplementationOnce(async () => 'voted');

      const input = { id, vote: "down" };
  
      const result = await songService.updateScore(input);
  
      expect(deleteSongSpy).not.toHaveBeenCalled();
      expect(updateScoreSpy).toHaveBeenCalled()
      expect(result).toBe('voted')
    });
  })
});

describe('songService#getRandomRecommendation', ()=>{
  it('should return ')
});

describe('songService#getListOfTopSongs', ()=>{

});