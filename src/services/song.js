import * as songRepository from '../repositories/song';

export function validateObject({ object, schema }) {
  const validation = schema.validate(object);
  return !validation.error;
}

export async function addNewSong({ name, youtubeLink }) {
  const input = { name, youtubeLink, rating: 0 };
  return await songRepository.insertSong(input);
}

export async function checkSongExist(id) {
  const song = await songRepository.getSongById(id);
  return !!song;
}

export async function updateScore({ id, vote }) {
  if (vote === 'up') {
    return await songRepository.updateScore({ id, vote: 1 });
  }

  const { song_score } = await songRepository.getSongById(id);
  if (song_score <= -4) {
    return await songRepository.deleteSong(id);
  }

  return await songRepository.updateScore({ id, vote: -1 });
}

export async function getRandomRecommendation() {
  const rating = (Math.random() <= 0.30)
    ? 'lower'
    : 'higher';

  const recommendation = await songRepository.getRecommendation({ rating });

  if (!recommendation) return await songRepository.getRecommendation();

  return recommendation;
}

export async function getListOfTopSongs(amount) {
  const bestSongs = await songRepository.getSongsByScore(amount);
  return bestSongs;
}
