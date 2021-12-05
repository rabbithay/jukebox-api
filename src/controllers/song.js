/* eslint-disable no-unused-vars */
import * as songService from '../services/song';

export async function addNewSong(req, res) {
  const { name, youtubeLink } = req.body;
  const isYoutubeLink = songService.isYoutubeLink({ name, youtubeLink });
  if (!isYoutubeLink) return res.sendStatus(404);

  await songService.addNewSong({ name, youtubeLink });
  return res.sendStatus(201);
}

export async function check() {
//
}
