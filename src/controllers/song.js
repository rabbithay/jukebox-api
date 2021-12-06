import * as songService from '../services/song';
import { addNewSongSchema } from '../schemas/addNewSongSchema';
import { positiveIntegerSchema } from '../schemas/positiveIntegerSchema';

export async function addNewSong(req, res) {
  const { name, youtubeLink } = req.body;

  const isYoutubeLink = songService.validateObject({
    object: { name, youtubeLink },
    schema: addNewSongSchema,
  });
  if (!isYoutubeLink) return res.sendStatus(404);

  await songService.addNewSong({ name, youtubeLink });
  return res.sendStatus(201);
}

export async function vote(req, res) {
  const { id } = req.params;

  const isValidId = songService.validateObject({
    object: { number: id },
    schema: positiveIntegerSchema,
  });
  if (!isValidId) return res.sendStatus(404);

  const songExist = await songService.checkSongExist(id);
  if (!songExist) return res.sendStatus(404);

  await songService.updateScore({ id, vote: 'up' });
  return res.sendStatus(200);
}

export async function getRecommendation(req, res) {
  const recommendation = await songService.getRandomRecommendation();
  if (!recommendation) return res.sendStatus(404);

  const {
    song_id, song_name, song_url, song_score,
  } = recommendation;

  const response = {
    id: song_id,
    name: song_name,
    youtubeLink: song_url,
    score: song_score,
  };

  return res.status(200).send(response);
}

export async function getTopSongs(req, res) {
  const { amount } = req.params;

  const isValidAmount = songService.validateObject({
    object: { number: amount },
    schema: positiveIntegerSchema,
  });
  if (!isValidAmount) return res.sendStatus(404);

  const bestSongs = await songService.getListOfTopSongs(amount);
  const response = bestSongs.map(({
    song_id, song_name, song_url, song_score,
  }) => {
    const song = {
      id: song_id,
      name: song_name,
      youtubeLink: song_url,
      score: song_score,
    };
    return song;
  });
  return res.send(response).status(200);
}
