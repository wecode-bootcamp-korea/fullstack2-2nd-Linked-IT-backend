import { postService } from '../services';

const readPost = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const posts = await postService.readPost(offset, limit);
    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
  }
};

const createPost = async (req, res) => {
  try {
    const postBody = req.body;
    const createdPost = await postService.createPost(postBody);
    res.status(201).send(createdPost);
  } catch (err) {
    console.log(err);
  }
};

const createHashtag = async (req, res) => {
  try {
    const postBody = req.body;
    const createdPost = await postService.createHashtag(postBody);
    res.status(201).send(createdPost);
  } catch (err) {
    console.log(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const postBody = req.body;
    const updatedPost = await postService.updatePost(postBody);
    res.status(201).send(updatedPost);
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const postBody = req.body;
    const post = await postService.deletePost(postBody);
    res.status(201).send(post);
  } catch (err) {
    console.log(err);
  }
};

const getLikeByPost = async (req, res) => {
  try {
    const sumOfLike = await postService.getLikeByPost();
    res.status(200).send(sumOfLike);
  } catch (err) {
    console.log(err);
  }
};

const addLike = async (req, res) => {
  try {
    const likeBody = req.body;
    const liked = await postService.addLike(likeBody);
    res.status(200).send(liked);
  } catch (err) {
    console.log(err);
  }
};

const cancelLike = async (req, res) => {
  try {
    const likeBody = req.body;
    const cancelLike = await postService.cancelLike(likeBody);
    res.status(200).send(cancelLike);
  } catch (err) {
    console.log(err);
  }
};

export default {
  readPost,
  createPost,
  createHashtag,
  updatePost,
  deletePost,
  getLikeByPost,
  addLike,
  cancelLike,
};
