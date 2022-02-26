import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid'

let db;

async function openDb (path) {
    db = await open({
        filename: path,
        driver: sqlite3.Database
    })

    await db.run('CREATE TABLE IF NOT EXISTS sessions ( sessionID TEXT NOT NULL, userID TEXT NOT NULL, expiry INTEGER NOT NULL );');
}

async function createSession(userID) {
    let user = await db.get('SELECT id FROM users WHERE id = ?', userID);
    
    if (!user)
        return false;

    let session = uuidv4();
    let expiry = Date.now() + 1000 * 60 * 60 * 24;

    await db.run('INSERT INTO sessions (sessionID, userID, expiry) VALUES (?, ?, ?)', [ session, userID, expiry ]);
    return session;
}

async function verifySession(sessionID) {
    let row = await db.get('SELECT userID, expiry FROM sessions WHERE sessionID = ?', [ sessionID ]);
    
    if (!row)
        return false;

    if (row.expiry < Date.now()) {
        await db.run('DELETE FROM sessions WHERE sessionID = ?', [ sessionID ]);
        return false;
    }

    return row.userID;
}

export default {
    openDb,
    database: db,
    createSession,
    verifySession,
    // openFile
}