import connection from '../../src/database/database';
import { newSongBody } from './generateNewSongObject';

const { name, youtubeLink } = newSongBody;

export async function addSongIntoDatabaseReturningId(score = 0) {
  const id = await connection.query(`
      INSERT INTO songs
      (song_name, song_url, song_score)
      VALUES ($1, $2, $3)
      RETURNING song_id
    `, [name, youtubeLink, score]);
  return id.rows[0].song_id;
}
