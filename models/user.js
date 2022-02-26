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
    username: user.username,
    bio: user.bio,
    streak: user.streak,
    friends: user.posts,
    posts: user.posts
  }
}

async function createNewUser(username, password, bio) {
  let u = {
    id: uuidv4(),
    username: username,
    passwordHash: await hashPassword(password),
    bio: bio,
    streak: 0,
    friends: [],
    posts: []
  };

  database.saveUser(u);
}

async function verifyUser(username, password) {
  let u = await database.findUser(username);
  return await bcrypt.compare(password, u.passwordHash);  
}

export default {
  createNewUser,
  getPublicUser,
  verifyUser,
  addFriend,
  addPost,
}