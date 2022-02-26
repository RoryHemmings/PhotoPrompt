import express from 'express';
const router = express.Router();

/* GET posts listing. */
router.get('/', function(req, res, next) {
  res.send('posts home');
});

export default router;