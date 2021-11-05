import { Prisma } from '.prisma/client';
import prisma from '../../prisma';

const createCommentOfPost = async (commentBody) => {
  const { postId, userId, content } = commentBody;
  console.log(postId, userId, content);
  return await prisma.$queryRaw`
  INSERT INTO comments
    (content, post_id, user_id)
  VALUES
    (${content}, ${postId}, ${userId})
    ;`;
};

const getCommentOfPost = async () => {
  return await prisma.$queryRaw`
  SELECT
    c.content,
    c.id,
    c.created_at,
    c.post_id AS postId,
    u.id AS userId,
    u.first_name AS firstName,
    u.last_name AS lastName,
    ui.user_profile_url AS userProfileUrl,
    pc.headline AS headline
  FROM
    comments c
  LEFT JOIN
    users u
  ON
    u.id = c.user_id
  LEFT JOIN
    user_images ui
  ON
    ui.id = u.id
  LEFT JOIN
    user_positions up
  ON
    up.user_id = u.id
  LEFT JOIN
    positions p
  ON
    p.id = up.position_id   
  LEFT JOIN
    position_careers pc
  ON
    pc.user_id = u.id  
  ORDER BY
    c.created_at DESC
  `;
};

const updateCommentOfPost = async (commentBody) => {
  const { content, commentId } = commentBody;
  return await prisma.$queryRaw`
    UPDATE
      comments
    SET
      content = ${content}
    WHERE id = ${commentId}
    `;
};

const deleteCommentOfPost = async (commentBody) => {
  const { commentId } = commentBody;
  await prisma.$queryRaw`
  DELETE FROM
    comments
  WHERE id = ${commentId}
  `;
};

const getLikeByPost = async () => {
  return await prisma.$queryRaw``;
};

const addLike = async (likeBody) => {
  const { commentId, userId } = likeBody;
  return await prisma.$queryRaw`
    INSERT comment_likes
      (comment_id, user_id)
    VALUES
      (${commentId}, ${userId})  
  `;
};

// 대댓글은 추가구현으로
// const createSubCommentOfPost = async () => {};

export default {
  createCommentOfPost,
  getCommentOfPost,
  updateCommentOfPost,
  deleteCommentOfPost,
  getLikeByPost,
  addLike,
  // createSubCommentOfPost,
};
