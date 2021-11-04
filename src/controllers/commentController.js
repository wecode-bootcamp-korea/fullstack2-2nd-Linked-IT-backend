import { commentService } from '../services';

const getCommentOfPost = async (req, res) => {
  try {
    const postId = req.body;
    const comment = await commentService.getCommentOfPost(postId);
    res.status(200).send(comment);
  } catch (err) {
    console.log(err);
  }
};

const createCommentOfPost = async (req, res) => {
  try {
    const commentBody = req.body;
    const createdComment = await commentService.createCommentOfPost(
      commentBody
    );
    res.status(200).send(createdComment);
  } catch (err) {
    console.log(err);
  }
};

// const createSubCommentOfPost = async (req, res) => {
//   try {
//     const commentBody = req.body;
//     const createdSubComment = await commentService.createSubCommentOfPost(
//       commentBody
//     );
//     res.status(200).send(createdSubComment);
//   } catch (err) {
//     console.log(err);
//   }
// };

const updateCommentOfPost = async (req, res) => {
  console.log(123);
  try {
    const commentBody = req.body;
    const updatedComment = await commentService.updateCommentOfPost(
      commentBody
    );
    res.status(200).send(updatedComment);
  } catch (err) {
    console.log(err);
  }
};

const deleteCommentOfPost = async (req, res) => {
  try {
    const commentBody = req.body;
    const deletedComment = await commentService.deleteCommentOfPost(
      commentBody
    );
    res.status(200).send(deletedComment);
  } catch (err) {
    console.log(err);
  }
};

const getLikeByComment = async (req, res) => {
  try {
    const sumOfLike = await commentService.getLikeByComment();
    res.status(200).send(sumOfLike);
  } catch (err) {
    console.log(err);
  }
};

const addLike = async (req, res) => {
  try {
    const likeBody = req.body;
    const liked = await commentService.addLike(likeBody);
    res.status(200).send(liked);
  } catch (err) {
    console.log(err);
  }
};

const cancelLike = async (req, res) => {
  try {
    const likeBody = req.body;
    const cancelLike = await commentService.cancelLike(likeBody);
    res.status(200).send(cancelLike);
  } catch (err) {
    console.log(err);
  }
};

export default {
  createCommentOfPost,
  getCommentOfPost,
  updateCommentOfPost,
  deleteCommentOfPost,
  // createSubCommentOfPost,
  getLikeByComment,
  addLike,
  cancelLike,
};
