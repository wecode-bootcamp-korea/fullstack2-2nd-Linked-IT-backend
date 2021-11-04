import { postDao } from '../models';

const readPost = async () => {
  const post = await postDao.readPost();
  return post;
};

const createPost = async (postBody) => {
  const post = await postDao.createPost(postBody);
  return post;
};

// const createHashtag = async (postBody) => {
//   const post = await postDao.createHashtag(postBody);
//   return post;
// };

const updatePost = async (postBody) => {
  const post = await postDao.updatePost(postBody);
  return post;
};

const deletePost = async (postBody) => {
  const post = await postDao.deletePost(postBody);
  return post;
};

const getLikeByPost = async () => {
  const sumOfLike = await postDao.getLikeByPost();
  return sumOfLike;
};

const addLike = async (likeBody) => {
  const liked = await postDao.addLike(likeBody);
  return liked;
};

const cancelLike = async (likeBody) => {
  const liked = await postDao.cancelLike(likeBody);
  return liked;
};

export default {
  readPost,
  createPost,
  updatePost,
  deletePost,
  getLikeByPost,
  addLike,
  cancelLike,
  // createHashtag,
};
