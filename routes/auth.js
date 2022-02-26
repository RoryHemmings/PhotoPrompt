// ty to https://github.com/passport/todos-express-password

import { Router } from 'express';
import db from '../utils/database';
import user from '../models/user.js';

const router = Router();

router.post('/register', (req, res, next) => {
    // create user
    res.status(201);

});

router.post('/login', (req, res, next) => {
    if (true /*login failed*/) {
        res.status(401);
        res.send('Invalid username or password');
    } else {
        db.createSession(/* user id */).then(session => {
            res.status(200);
            res.send({ session });
        }).catch(err => {
            res.status(504);
            next(err);
        });
    }
});

export default router;