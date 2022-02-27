import express from 'express';
import posts from '../models/post.js';

const router = express.Router();

/* GET posts listing. */
router.get('/', async (req, res, next) => {
  let all = await posts.getAllPosts();

  if (!all) {
    res.status(500);
    res.send();
  } else {
    res.status(200);
    res.json(all);
  }
});

router.get('/:id', async (req, res, next) => {
  let p = await posts.getPost(req.params.id);

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
  let userID = req.body.userID;
  let newPostID = await posts.createNewPost(userID, req.body.description, req.body.image);
  res.status(200);
  res.json({id: newPostID});
});

export default router;