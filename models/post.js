import database from '../utils/database.js'
import { v4 as uuidv4 } from 'uuid'

async function debugPrint() {
  console.log(await database.getAllPosts());
}

// Creates new post, returns id of new post
async function createNewPost(userID, description, image) {
  // Create user object
  let p = {
    id: uuidv4(),
    userID: userID,
    description: description,
    image: image,
    date: Date.now()
  };

  // Save user object to database
  database.savePost(p);
  return p.id;
}

// Return user object if found, and undefined otherwise
async function getPost(postID) {
  let u = await database.getPost(postID);

  if (!u)
    return undefined;

  return u;
}

export default {
  debugPrint,
  createNewPost,
  getPost
}
