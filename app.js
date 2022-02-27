import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import promptRouter from './routes/prompts.js';
import postsRouter from './routes/posts.js'

import databaseUtil from'./utils/database.js';

const PORT = 8080;

const app = express();

// ty to https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/currentPrompt', promptRouter);
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("Error " + err.status + " :(");
});

(async () => {
  await databaseUtil.openDb(path.join(__dirname, 'db', 'db.db'));

  app.listen(PORT, () => {
    console.log('started on ' + PORT + ' yeah-yuh.');
  })
})();
