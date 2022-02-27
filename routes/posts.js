import express from 'express';
import post from '../models/post.js';

const router = express.Router();

/* GET posts listing. */
router.get('/', (req, res, next) => {
  res.send('posts home');
});

router.get('/:id', async (req, res, next) => {
  let p = await user.getUser(req.params.id);

  // Check if user was found
  if (!p) {
    res.status(404);
    res.json({});
  } else {
    res.status(200);
    res.json(p);
  } 
});

router.post('/', async (req, res, next) => {
  let userID = req.userID;
  let newPostID = posts.createNewPost(userID, req.desciption, req.image);
  res.json({id: newPostID});
});

export default router;