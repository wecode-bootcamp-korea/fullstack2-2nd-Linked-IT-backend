import { commentService } from '../services';

const getCommentOfPost = async (req, res) => {
  try {
    const query = req.query;
    const { limit, offset } = req.query;
    const comment = await commentService.getCommentOfPost(query, limit, offset);
    res.status(200).send(comment);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getCommentOfPost,
};
