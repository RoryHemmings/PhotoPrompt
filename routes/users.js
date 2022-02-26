import express from 'express';
import user from '../models/user.js'

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  // if (await user.createNewUser('rpmhemmings@gmail.com', 'Rory', 'password', 'first user'))
  //   console.log('Created User');
  // else
  //   console.log('User already exists');

  // console.log('Password verified: ' + await user.verifyUser('rpmhemmings@gmail.com', 'password'));
  user.debugPrint();

  res.send('success');
});

router.get('/:id', async (req, res, next) => {
  let u = await user.getUser(req.params.id);

  // Check if user was found
  if (!u) {
    res.status(404);
    res.json({});
  } else {
    res.status(200);
    res.json(u);
  }
});



export default router;