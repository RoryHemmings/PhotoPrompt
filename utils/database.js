import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

let db;

async function openDb (path) {
    db = open({
        filename: path,
        driver: sqlite3.Database
    })

    return db;
}

export default {
    openDb,
    database: db,
    // openFile
}