import { commentDao } from '../models';

const createCommentOfPost = async (commentBody) => {
  const createdComment = await commentDao.createCommentOfPost(commentBody);
  return createdComment;
};

// const createSubCommentOfPost = async (commentBody) => {
//   const createdComment = await commentDao.createSubCommentOfPost(commentBody);
//   return createdComment;
// };

const getCommentOfPost = async (postId) => {
  const comment = await commentDao.getCommentOfPost(postId);
  return comment;
};

const updateCommentOfPost = async (commentBody) => {
  const updatedComment = await commentDao.updateCommentOfPost(commentBody);
  return updatedComment;
};

const deleteCommentOfPost = async (commentBody) => {
  const deletedComment = await commentDao.deleteCommentOfPost(commentBody);
  return deletedComment;
};

const getLikeByPost = async () => {
  const sumOfLike = await commentDao.getLikeByPost();
  return sumOfLike;
};

const addLike = async (likeBody) => {
  const liked = await commentDao.addLike(likeBody);
  return liked;
};

export default {
  createCommentOfPost,
  getCommentOfPost,
  updateCommentOfPost,
  deleteCommentOfPost,
  // createSubCommentOfPost,
  getLikeByPost,
  addLike,
};
