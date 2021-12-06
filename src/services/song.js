/* eslint-disable no-unused-vars */
import * as songRepository from '../repositories/song';
import addNewSongSchema from '../schemas/addNewSongSchema';

export function isYoutubeLink({ name, youtubeLink }) {
  const validation = addNewSongSchema.validate({ name, youtubeLink });
  return !validation.error;
}

export async function addNewSong({ name, youtubeLink }) {
  const input = { name, youtubeLink, rating: 0 };
  await songRepository.insertSong(input);
}

export async function songExist(id) {
  const song = await songRepository.getSongById(id);
  return !!song;
}

export async function updateScore({ id, vote }) {
  if (vote === 'up') {
    await songRepository.updateScore({ id, vote: 1 });
    return;
  }

  const { score } = await songRepository.getSongById(id);
  if (score < -4) {
    await songRepository.deleteSong(id);
    return;
  }

  await songRepository.updateScore({ id, vote: -1 });
}
