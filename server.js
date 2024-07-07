import express from 'express';
import { createPool } from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  queueLimit: 0,
});

app.use(express.static('public'));



app.get('/heroes', (req, res) => {
  pool.query('SELECT * FROM heroes', (err, results) => {
    if (err) {
      console.error('Error to search hero:  ', err);
      res.status(500).send('Error to search hero');
      return;
    }
    res.json(results);
  });
});

app.post('/heroes', (req, res) => {
  const { name, main_attr, agi, str, intel, image_url } = req.body;

  if (!name || !main_attr || !agi || !str || !intel || !image_url) {
    res.status(400).send('All hero fields are required');
    return;
  }

  const query =
    'INSERT INTO heroes (name, main_attr, agi, str, intel, image_url) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [name, main_attr, agi, str, intel, image_url];

  pool.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting hero: ', err);
      res.status(500).send('Error inserting hero');
      return;
    }
    res.status(201).send('Hero saved successfully');
  });
});

app.put('/heroes', (req, res) => {
  const { name, main_attr, agi, str, intel, image_url, id } = req.body;

  if (!id || !name || !main_attr || !agi || !str || !intel || !image_url) {
    res.status(400).send('All hero fields are required');
    return;
  }

  const query = `UPDATE heroes SET name = ?, main_attr = ?, agi = ?, str = ?, intel = ?, image_url = ? WHERE id = ?`;
  const values = [name, main_attr, agi, str, intel, image_url, id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o herói:', err);
      res.status(500).send('Erro ao atualizar o herói');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Herói não encontrado');
      return;
    }
    res.send('Herói atualizado com sucesso');
  });
});

app.delete('/heroes', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send({ message: 'ID is required' });
  }

  const query = 'DELETE FROM heroes WHERE id = ?';
  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting hero: ', err);
      res.status(500).send('Error deleting hero');
      return;
    }
    res.status(200).send('Hero deleted successfully');
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});