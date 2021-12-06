import connection from '../database/database';

export async function insertSong({ name, youtubeLink, rating }) {
  await connection.query(`
    INSERT INTO songs
    (song_name, song_url, song_score)
    VALUES ($1, $2, $3)
  `, [name, youtubeLink, rating]);
}

export async function getSongById(id) {
  const song = await connection.query(`
    SELECT * 
    FROM songs
    WHERE song_id = $1
  `, [id]);
  return song?.rows[0];
}

export async function updateScore({ id, vote }) {
  await connection.query(`
    UPDATE songs
    SET song_score = song_score + $1
    WHERE song_id = $2
  `, [vote, id]);
}

export async function deleteSong(id) {
  await connection.query(`
    DELETE 
    FROM songs
    WHERE song_id = $1
  `, [id]);
}
