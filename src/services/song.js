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
