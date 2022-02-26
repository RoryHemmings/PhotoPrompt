import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

let database;

async function openDb (path) {
    database = await open({
        filename: path,
        driver: sqlite3.Database
    })

    return database;
}

// If the user already exists, update it, otherwise add it
function saveUser(user) {
  console.log(user);
}

// Get user by id
function getUser(userID) {
  // get user by id
}

// Find user by username
function findUser(username) {

}

// Get post by postID
function getPost(postID) {

}

export default {
    openDb,
    saveUser,
    getUser,
    findUser,
    getPost,
    database,
    // openFile
}