import express from 'express';
import {
  addUserHero,
  getUserHeroes,
  getHeroes,
  createHero,
  updateHero,
  deleteHero,
} from '../controllers/heroesController.js';
import authenticateJWT from '../middleware/auth.js';

const router = express.Router();

router
  .get('/', getHeroes)
  .post('/', authenticateJWT, createHero)
  .put('/:heroId', authenticateJWT, updateHero)
  .delete('/:heroId', authenticateJWT, deleteHero);

router.get('/user', authenticateJWT, getUserHeroes);
router.post('/user', authenticateJWT, addUserHero);

export default router;
