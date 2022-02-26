import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dayjs from 'dayjs';

const router = Router();

// ty to https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = fs.readFileSync(path.join(__dirname, '..', 'prompts.txt')).toString();
let prompts = {};
file.split('\n').forEach(string => {
    let date = string.substring(0, 10);
    let prompt = string.substring(11);

    prompts[date] = prompt;
})


router.get('/', (req, res, next) => {
    let prompt = prompts[dayjs().format('YYYY-MM-DD')];

    if (!prompt)
        return next(createError(500));
    
    res.send(prompt);
});

export default router;