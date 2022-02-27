import database from '../utils/database.js'
import { v4 as uuidv4 } from 'uuid'

async function debugPrint() {
  console.log(await database.getAllPosts());
}

// Creates new post, returns id of new post
async function createNewPost(userID, description, image) {
  // Create post object
  let p = {
    id: uuidv4(),
    userID: userID,
    description: description,
    image: image,
    date: Date.now()
  };

  // Save post object to database
  database.savePost(p);
  return p.id;
}

// Return post object if found, and undefined otherwise
async function getPost(postID) {
  let p = await database.getPost(postID);

  if (!p)
    return undefined;

  return p;
}

async function getAllPosts() {
  return await database.getAllPosts();
}

export default {
  debugPrint,
  createNewPost,
  getAllPosts,
  getPost
}
