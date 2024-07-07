import { createConnection } from 'mysql2';
import heroes from './heroes.js';

const connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect();

const queries = [
  'CREATE DATABASE IF NOT EXISTS ' + process.env.DB_NAME,
  'USE ' + process.env.DB_NAME,
  'DROP TABLE IF EXISTS heroes',

  `CREATE TABLE heroes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    main_attr VARCHAR(255) NOT NULL,
    agi INT NOT NULL,
    str INT NOT NULL,
    intel INT NOT NULL,
    image_url VARCHAR(255) NOT NULL
  )`,
];

const getQueryName = (query) => {
  const match = query.match(/^[A-Z ]+/);
  return match ? match[0].trim() : 'QUERY';
};

queries.forEach((query) => {
  const queryName = getQueryName(query);
  connection.query(query, (err) => {
    if (err) {
      console.error(`Error in: ${queryName}: `, err.message);
    } else {
      console.log(`${queryName} successfully executed.`);
    }
  });
});

heroes.forEach((hero) => {
  const query =
    'INSERT INTO heroes (name, main_attr, agi, str, intel, image_url) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(
    query,
    [hero.name, hero.main_attr, hero.attrs.agi, hero.attrs.str, hero.attrs.intel, hero.image_url],
    (err) => {
      if (err) {
        console.error('Data insert error: ', err.message);
      } else {
        console.log(`${hero.name} imported!`);
      }
    }
  );
});

connection.end();
