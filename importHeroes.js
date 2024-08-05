import { createPool } from 'mysql2/promise';
import heroes from './heroes.js';
import 'dotenv/config';

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const queries = [
  'CREATE DATABASE IF NOT EXISTS ' + process.env.DB_NAME,
  'USE ' + process.env.DB_NAME,
  'DROP TABLE IF EXISTS heroes',
  'DROP TABLE IF EXISTS users',
  'DROP TABLE IF EXISTS user_heroes',

  `CREATE TABLE heroes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    main_attr VARCHAR(255) NOT NULL,
    agi INT NOT NULL,
    str INT NOT NULL,
    intel INT NOT NULL,
    image_vert VARCHAR(255) NOT NULL
  )`,

  `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )`,

  `CREATE TABLE user_heroes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    hero_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (hero_id) REFERENCES heroes(id),
    UNIQUE (user_id, hero_id)
  )`
];

const getQueryName = (query) => {
  const match = query.match(/^[A-Z ]+/);
  return match ? match[0].trim() : 'QUERY';
};

const runQueries = async () => {
  try {
    const connection = await pool.getConnection();

    for (const query of queries) {
      const queryName = getQueryName(query);
      try {
        await connection.query(query);
        console.log(`${queryName} successfully executed.`);
      } catch (err) {
        console.error(`Error in: ${queryName}: `, err.message);
      }
    }

    for (const hero of heroes) {
      const query =
        'INSERT INTO heroes (name, main_attr, agi, str, intel, image_vert) VALUES (?, ?, ?, ?, ?, ?)';
      try {
        await connection.query(query, [
          hero.name,
          hero.main_attr,
          hero.attrs.agi,
          hero.attrs.str,
          hero.attrs.intel,
          hero.image_vert,
        ]);
        console.log(`${hero.name} imported!`);
      } catch (err) {
        console.error('Data insert error: ', err.message);
      }
    }

    connection.release();
  } catch (err) {
    console.error('Connection error: ', err.message);
  } finally {
    pool.end();
  }
};

runQueries();
