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

router.get('/', getHeroes);
router.post('/', authenticateJWT, createHero);
router.put('/', authenticateJWT, updateHero);
router.delete('/', authenticateJWT, deleteHero);
router.get('/user', authenticateJWT, getUserHeroes);
router.post('/user', authenticateJWT, addUserHero);

export default router;
