import { Prisma } from '.prisma/client';
import prisma from '../../prisma';

const createCommentOfPost = async (commentBody) => {
  const { postId, userId, content } = commentBody;
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
    c.content AS commentContent,
    c.id AS commentId,
    ps.id AS postId,
    c.created_at AS createdAt,
    u.id AS userId,
    u.first_name AS userFirstName,
    u.last_name AS userLastName,
    ui.user_profile_url AS userProfileImageUrl,
    pc.headline AS userCurrentPosition,
    p.position_name AS userPosition,
        (
        SELECT COUNT(comment_id)
          FROM
            comment_likes cl
          WHERE
            cl.comment_id = c.id
      ) AS sumOfCommentLike
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
  LEFT JOIN
    posts ps
  ON
    ps.id = c.post_id   
  ORDER BY
    c.created_at DESC
  `;
};

const updateCommentOfPost = async (commentBody) => {
  const { updateContent, commentId } = commentBody;
  return await prisma.$queryRaw`
    UPDATE
      comments
    SET
      content = ${updateContent}
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

const getLikeByComment = async () => {
  const user_id = 1;
  const friendList = await prisma.$queryRaw`
    SELECT
      f.user_id
    FROM
      users u
    LEFT JOIN
      friends f
    ON
      f.friend_id = u.id
    WHERE
      f.friend_status_id = 4
    AND
      u.id = 1
    `;
  const userFriendList = friendList.map((a) => a.user_id);
  userFriendList.unshift(user_id);

  return await prisma.$queryRaw`
    SELECT
      p.id AS postId,
      c.id AS commentId,
      (
        SELECT COUNT(comment_id)
          FROM
            comment_likes cl
          WHERE
            cl.comment_id = c.id
      ) AS commentLikeCount
    FROM
      comments c
    LEFT JOIN
      comment_likes cl
    ON
      cl.comment_id = c.id
    LEFT JOIN
      users u
    ON
      u.id = cl.id
    LEFT JOIN
      posts p
    ON
      c.post_id = p.id
    WHERE p.user_id IN (${Prisma.join(userFriendList)})
    GROUP BY c.id
  `;
};

const addLike = async (likeBody) => {
  const { commentId, userId } = likeBody;
  return await prisma.$queryRaw`
  INSERT INTO comment_likes
    (comment_id, user_id)
  VALUES
    (${commentId}, ${userId})
      ;`;
};

const cancelLike = async (likeBody) => {
  const { commentId, userId } = likeBody;
  return await prisma.$queryRaw`
  DELETE FROM
    comment_likes
  WHERE
    comment_id = ${commentId}
  AND
    user_id = ${userId}
  ;`;
};

// 대댓글은 추가구현으로
// const createSubCommentOfPost = async () => {};

export default {
  createCommentOfPost,
  getCommentOfPost,
  updateCommentOfPost,
  deleteCommentOfPost,
  getLikeByComment,
  addLike,
  cancelLike,
  // createSubCommentOfPost,
};
