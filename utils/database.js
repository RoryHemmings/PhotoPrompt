import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

let db;

async function openDb (path) {
    db = await open({
        filename: path,
        driver: sqlite3.Database
    });

    await db.run(
      'CREATE TABLE IF NOT EXISTS users (id BLOB PRIMARY KEY, ' +
      'email TEXT, username TEXT, passwordHash TEXT, bio TEXT, ' +
      'streak INTEGER, friends TEXT, posts TEXT)'
    );

    return db;
}

async function getAllUsers() {
  return await db.all(
    'SELECT * from users'
  );
}

async function insertUser(user) {
  await db.run(
    'INSERT INTO users (id, email, username, passwordHash, bio, ' + 
    'streak, friends, posts) ' +
    'VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 
    [user.id, user.email, user.username, user.passwordHash, user.bio, 
      user.streak, JSON.stringify(user.friends), JSON.stringify(user.posts)]
  );
}

async function updateUser(user) {
  await db.run(
    'UPDATE users id=? email=? username=? passwordHash=? bio=? ' + 
    'streak=? friends=? posts=? ' +
    'VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 
    [user.id, user.email, user.username, user.passwordHash, user.bio, 
      user.streak, JSON.stringify(user.friends), JSON.stringify(user.posts)]
  );
}

// If the user already exists, update it, otherwise add it
async function saveUser(user) {
  if (await getUser(user.id))
    updateUser(user);
  else
    insertUser(user);
}
 
// Get user by id, return undefined otherwise
async function getUser(userID) {
  let row = await db.get(
    'SELECT * FROM users WHERE id = ?',
    [userID]
  );

  // User couldn't be found
  if (!row)
    return undefined;

  return {
    id: row.id,
    email: row.email,
    username: row.username,
    passwordHash: row.passwordHash,
    bio: row.bio,
    streak: row.streak,
    friends: JSON.parse(row.friends),
    post: JSON.parse(row.posts)
  }
}

// Find user by email
async function findUser(email) {
  let row = await db.get(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  // User couldn't be found
  if (!row)
    return undefined;

  return {
    id: row.id,
    email: row.email,
    username: row.username,
    passwordHash: row.passwordHash,
    bio: row.bio,
    streak: row.streak,
    friends: JSON.parse(row.friends),
    post: JSON.parse(row.posts)
  }
}

// Get post by postID
async function getPost(postID) {

}

// Get number of recent posts
async function getPosts(num) {

}

export default {
    openDb,
    getAllUsers,
    saveUser,
    getUser,
    findUser,
    getPost,
    getPosts
    // openFile
}