import { pool } from '../db/index.js';

export const getHeroes = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM heroes');
    res.json(results);
  } catch (err) {
    console.error('Error fetching heroes:', err);
    res.status(500).send('Error fetching heroes');
  }
};

export const createHero = async (req, res) => {
  const { name, main_attr, agi, str, intel, image_vert } = req.body;
  const query =
    'INSERT INTO heroes (name, main_attr, agi, str, intel, image_vert) VALUES (?, ?, ?, ?, ?, ?)';
  try {
    await pool.query(query, [name, main_attr, agi, str, intel, image_vert]);
    res.status(201).send('Hero added');
  } catch (err) {
    console.error('Error adding hero:', err);
    res.status(500).send('Error adding hero');
  }
};

export const updateHero = async (req, res) => {
  const { name, main_attr, agi, str, intel, image_vert } = req.body;
  const { heroId } = req.params
  const query =
    'UPDATE heroes SET name = ?, main_attr = ?, agi = ?, str = ?, intel = ?, image_vert = ? WHERE id = ?';
  try {
    await pool.query(query, [name, main_attr, agi, str, intel, image_vert, heroId]);
    res.send('Hero updated');
  } catch (err) {
    console.error('Error updating hero:', err);
    res.status(500).send('Error updating hero');
  }
};

export const deleteHero = async (req, res) => {
  const { heroId } = req.params
  const query = 'DELETE FROM heroes WHERE id = ?';
  try {
    await pool.query(query, [heroId]);
    res.send('Hero deleted');
  } catch (err) {
    console.error('Error deleting hero:', err);
    res.status(500).send('Error deleting hero');
  }
};

export const getUserHeroes = async (req, res) => {
  const user_id = req.user.id;
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM heroes INNER JOIN user_heroes ON heroes.id = user_heroes.hero_id WHERE user_heroes.user_id = ?',
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).send('Error fetching your heroes');
  }
};

export const addUserHero = async (req, res) => {
  const { hero_id } = req.body;
  const user_id = req.user.id;
  try {
    await pool.execute('INSERT INTO user_heroes (user_id, hero_id) VALUES (?, ?)', [
      user_id,
      hero_id,
    ]);
    res.send('Hero added to your list');
  } catch (err) {
    res.status(500).send('Error adding hero to your list');
  }
};
