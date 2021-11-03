import { commentDao } from '../models';

const getCommentOfPost = async (query, limit, offset) => {
  const comment = await commentDao.getCommentOfPost(query, limit, offset);
  return comment;
};

export default {
  getCommentOfPost,
};
