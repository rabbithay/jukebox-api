import Joi from 'joi';

export const addNewSongSchema = Joi.object({
  name: Joi.string().required(),
  youtubeLink: Joi.string()
    .pattern(/^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/)
    .required(),
});
