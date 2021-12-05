/* eslint-disable no-unused-vars */
import connection from '../database/database';

export async function insertSong({ name, youtubeLink, rating }) {
  await connection.query(`
    INSERT INTO songs
    (song_name, song_url, rating)
    VALUES ($1, $2, $3)
  `, [name, youtubeLink, rating]);
}

export async function example2() {
  //
}
