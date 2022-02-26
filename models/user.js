import database from '../utils/database.js'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10;

async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

function addFriend(userID, friendID) {
  let u = database.getUser(userID);
  u.friends.push(friendID);
  database.saveUser(u);
}

function addPost(userID, postID) {
  let u = database.getUser(userID);
  u.posts.push(postID);
  database.saveUser(u);
}

// Return simplified user object with public user attributes
function getPublicUser(user) {
  return {
    id: user.id,
    email: user.emal,
    username: user.username,
    bio: user.bio,
    streak: user.streak,
    friends: user.posts,
    posts: user.posts
  }
}

// Creates a user, returns false if user already exists
async function createNewUser(email, username, password, bio) {
  // Check if user already exists
  if (await database.findUser(email))
    return false;

  // Create user object
  let u = {
    id: uuidv4(),
    email: email,
    username: username,
    passwordHash: await hashPassword(password),
    bio: bio,
    streak: 0,
    friends: [],
    posts: []
  };

  // Save user object to database
  database.saveUser(u);
  return true;
}

async function verifyUser(email, password) {
  let u = await database.findUser(email);
  return await bcrypt.compare(password, u.passwordHash);  
}

async function getUser(userID) {
  return await database.getUser(userID);
}

async function findUser(email) {
  return await database.findUser(email);
}

export default {
  createNewUser,
  getPublicUser,
  findUser,
  verifyUser,
  addFriend,
  addPost,
}
