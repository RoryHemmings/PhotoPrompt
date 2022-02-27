// ty to https://github.com/passport/todos-express-password

import { Router } from 'express';
import db from '../utils/database.js';
import user from '../models/user.js';

const router = Router();

router.post('/register', (req, res, next) => {
    user.createNewUser(req.body.email, req.body.username, req.body.password, req.body.bio).then(success => {
        if (!success) {
            res.status(406);
            res.send('User already exists.');
            return;
        }
        
        res.status(201);
        res.send('OK.');
    }).catch(err => {
        next(err);
    });
});

router.post('/login', (req, res, next) => {
    user.verifyUser(req.body.email, req.body.password).then(success => {
        if (!success) {
            res.status(401);
            res.send('Invalid username or password');
            return;
        }

        user.findUser(req.body.email).then(found => {
            if (!found) {
                res.status(501);
                res.send('Could not find user');
                return;
            }

            db.createSession(found.id).then(session => {
                res.status(200);
                res.send({ session, userID: found.id });
            }).catch(err => {
                res.status(504);
                next(err);
            });
        }).catch(err => {
            console.log('Error finding user!');
            console.log(err);

            res.status(501);
            res.send();
        })
    }).catch(err => {
        console.log('Error verifying user!');
        console.log(err);

        res.status(500);
        res.send();
    });
});

export default router;