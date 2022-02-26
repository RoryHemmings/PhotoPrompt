import express from 'express';
import user from '../models/user.js'

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  if (await user.createNewUser('rpmhemmings@gmail.com', 'Rory', 'password', 'first user'))
    console.log('Created User');
  else
    console.log('User already exists');

  console.log('Password verified: ' + await user.verifyUser('rpmhemmings@gmail.com', 'password'));

  res.send('success');
});

export default router;