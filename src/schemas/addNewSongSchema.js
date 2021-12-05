import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const addNewSongSchema = Joi.object({
  name: Joi.string().required(),
  youtubeLink: Joi.string()
    .pattern(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/)
    .required(),
});
