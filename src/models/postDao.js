import { Prisma } from '.prisma/client';
import prisma from '../../prisma';

const readPost = async () => {
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
  userFriendList.push(user_id);
  console.log(friendList);

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
            COUNT(c.id) AS count
          FROM
            comments c
          WHERE
            c.post_id = p.id
        ) AS commentCount
      FROM
        posts p
      LEFT JOIN
        users u
      ON
        u.id = p.user_id
      LEFT JOIN
        comments c
      ON
        c.post_id = p.id
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
  DELETE FROM
    posts
  WHERE id = ${postId}   
  `;
};

export default {
  readPost,
  createPost,
  updatePost,
  deletePost,
};
