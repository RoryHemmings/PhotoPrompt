import express from 'express';
import user from '../models/user.js'

const router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  user.createNewUser('Rory', 'password', 'first user');
  // console.log('Password verified: ' + await user.verifyUser('Rory', 'password'));

  res.send('success');
});

export default router;