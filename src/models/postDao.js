import { Prisma } from '.prisma/client';
import prisma from '../../prisma';

const readPost = async (offset, limit) => {
  const user_id = 1;
  console.log(offset, limit);
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

  const getFriendPost = await prisma.$queryRaw`
    SELECT
      p.id,
      p.content,
      p.created_at,
      p.post_scope_of_public_id AS postScopeOfPublic,
      p.comment_scope_of_public_id AS commentScopeOfPublic,
      u.id AS userId,
      u.first_name AS firstName,
      u.last_name AS lastName,
      ui.user_profile_url AS userProfileUrl,
      pc.headline AS userCurrentPosition,
      (
        SELECT
            COUNT(c.id)
          FROM
            comments c
          WHERE
            c.post_id = p.id
        ) AS commentCount,
        (
        SELECT
            COUNT(pl.id)
          FROM
            post_likes pl
          WHERE
            pl.post_id = p.id
        ) AS likeCount
      FROM
        posts p
      LEFT JOIN
        users u
      ON
        u.id = p.user_id
      LEFT JOIN
        user_images ui
      ON
        ui.id = u.id
      LEFT JOIN
        user_positions up
      ON
        up.user_id = u.id
      LEFT JOIN
        positions po
      ON
        po.id = up.position_id   
      LEFT JOIN
        position_careers pc
      ON
        pc.user_id = u.id       
    WHERE p.user_id IN (${Prisma.join(userFriendList)})
    ORDER BY p.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
    ;`;
  return getFriendPost;
};

const createPost = async (postBody) => {
  const {
    content,
    postScopeOfPublicId,
    commentScopeOfPublicId,
    userId,
    postAttachmentId,
  } = postBody;
  await prisma.$queryRaw`
  INSERT INTO posts
    (content, post_scope_of_public_id, comment_scope_of_public_id, user_id, post_attachment_id)
  VALUES
    (${content}, ${postScopeOfPublicId}, ${commentScopeOfPublicId}, ${userId}, ${postAttachmentId})
  `;
};
const updatePost = async (postBody) => {
  const { updateContent, postId } = postBody;
  await prisma.$queryRaw`
    UPDATE
      posts
    SET
      content = ${updateContent}
    WHERE id = ${postId}   
    `;
};

const deletePost = async (postBody) => {
  const { postId } = postBody;
  await prisma.$queryRaw`
  SET FOREIGN_KEY_CHECKS=0
  ;`;
  await prisma.$queryRaw`
  DELETE FROM
    posts p
  WHERE
    p.id = ${postId}
  `;
  await prisma.$queryRaw`SET FOREIGN_KEY_CHECKS=1`;
};

const getLikeByPost = async () => {
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
  p.content AS postContent,
  (
    SELECT COUNT(pl.id)
    FROM
    post_likes pl
    WHERE
    pl.post_id = p.id
    ) AS postLikeCount
    FROM
    posts p
    LEFT JOIN
    post_likes pl
    ON
    pl.post_id = p.id
    LEFT JOIN
    post_like_styles pls
    ON
    pls.id = pl.post_like_style_id
    LEFT JOIN
    users u
    ON
    u.id = pl.user_id
    ORDER BY p.created_at DESC
    `;
};

const addLike = async (likeBody) => {
  const { postLikeStyleId, userId, postId } = likeBody;
  await prisma.$queryRaw`
    INSERT INTO post_likes
    (user_id, post_id, post_like_style_id)
    VALUES
    (${userId}, ${postId}, ${postLikeStyleId});
    `;
};

const cancelLike = async (likeBody) => {
  const { postId, userId } = likeBody;
  return await prisma.$queryRaw`
    DELETE FROM
    post_likes
    WHERE
    post_id = ${postId}
    AND
    user_id = ${userId}
    ;`;
};

// hashtag 추가 구현으로 미룸
// const createHashtag = async (postBody) => {
//   const { userId, hashtag } = postBody;
//   const [postId] = await prisma.$queryRaw`
//   SELECT
//     p.id
//   FROM
//     posts p
//   LEFT JOIN
//     users u
//   ON
//     p.id = u.id
//   WHERE
//     p.id = ${userId}
//   `;
//   //1. 유저가 작성한 포스트 id 조회
//   console.log('postID', postId.id);

//   //2. 유저가 작성한 해쉬태그 입력
//   await prisma.$queryRaw`
//   INSERT INTO hashtags
//     (title)
//   VALUES
//     (${hashtag})
//   `;

//   //3. 유저가 작성한 해쉬태그 id 조회
//   const [hashtagId] = await prisma.$queryRaw`
//   SELECT
//     h.id
//   FROM
//     hashtags h
//   LEFT JOIN
//     posts p
//   ON
//     h.id = p.id
//   WHERE
//     h.id = ${postId.id}
//   `;
//   console.log('hashId', hashtagId.id);

//   //4. 포스트와 해쉬태그를 이어주는 post_hashtags 중간 테이블에 조회한 값을 넣어준다..?
//   await prisma.$queryRaw`;
//   INSERT INTO post_hashtags
//     (post_id, hashtag_id)
//   VALUES
//     (${postId.id}, ${hashtagId.id})
//   `;
// };

// const getLikeByPost = async () => {
//   return await prisma.$queryRaw`
//     SELECT COUNT(post_likes_id)
//       FROM
//     comment_likes
//       WHERE post_id
//   `;
// };

export default {
  readPost,
  createPost,
  updatePost,
  deletePost,
  getLikeByPost,
  addLike,
  cancelLike,
};
