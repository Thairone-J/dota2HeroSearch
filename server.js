import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import heroesRoutes from './routes/heroes.js';
import usersRoutes from './routes/users.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/heroes', heroesRoutes);
app.use('/users', usersRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
