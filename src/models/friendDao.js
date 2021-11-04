import prisma from '../../prisma';
import { Prisma } from '@prisma/client';

const getTotalFriendCount = async (userId) => {
  const [totalFriendCountObj] = await prisma.$queryRaw`
    SELECT COUNT(1) count
      FROM friends
     WHERE user_id = ${userId}
  ;`;
  return totalFriendCountObj.count;
};

const getFriendListByStatus = async (userId, friendStatusId) => {
  let friendList = [];
  // 4: 친구, 2: 친구 요청 보냄
  if (friendStatusId == 4 || friendStatusId == 2) {
    friendList = await prisma.$queryRaw`
      SELECT friend_id userId
        FROM friends
       WHERE user_id = ${userId}
         AND friend_status_id = ${friendStatusId}
    ;`;
  }
  // 친구 요청 받음
  else {
    friendList = await prisma.$queryRaw`
      SELECT user_id userId
        FROM friends
       WHERE friend_id = ${userId}
         AND friend_status_id = 2
    ;`;
  }
  friendList = friendList.map((el) => el.userId);

  // 친구 정보 조회
  return await prisma.$queryRaw`
  SELECT u.id userId
      , u.last_name lastName
      , u.first_name firstName
      , i.user_profile_url userProfileUrl
      , c.college_name collegeName
      , m.major_name majorName
      , d.type degreeType
  FROM users u
  LEFT JOIN user_images i
        ON i.user_id = u.id
  LEFT JOIN educations e
        ON e.user_id = u.id
  LEFT JOIN colleges c
        ON c.id = e.college_id
  LEFT JOIN majors m
        ON m.id = e.major_id
  LEFT JOIN degrees d
        ON d.id = e.degree_id
  WHERE u.id IN (${Prisma.join(friendList)})
  ORDER BY u.last_name, u.first_name
  ;`;
};

const getFriend = async (userId) => {
  const getFriendList = await prisma.$queryRaw`
    SELECT  f.friend_id
          , f.user_id
          , f.friend_status_id
      FROM  friends f
     WHERE  f.user_id IN (SELECT  f.friend_id
                            FROM  friends f
                           WHERE  f.user_id = ${userId})
       AND  f.friend_id != ${userId}
      ;
    `;

  const newArr = getFriendList.map((el) => el.friend_id);
  const newSet = new Set(newArr);
  const friendList = [...newSet];

  const filterList = await prisma.$queryRaw`
    SELECT  u.id
          , u.first_name
          , u.last_name 
          , pc.headline
          , pc.description
      FROM  users u
 LEFT JOIN  position_careers pc
        ON  pc.user_id = u.id
     WHERE  u.id IN (${Prisma.join(friendList)})
     ;
    `;
  return filterList;
};

const addFriend = async (userInfo) => {
  const { userId, friendId } = userInfo;
  await prisma.$queryRaw`
    INSERT INTO friends (user_id, friend_id, friend_status_id)
    VALUES (${userId}, ${friendId}, 2)
  ;`;

  const [friendCountObj] = await prisma.$queryRaw`
    SELECT friend_id friendId
      FROM friends
     WHERE user_id = ${userId}
       AND friend_id = ${friendId}
  ;`;
  return friendCountObj.friendId.toString();
};

const deleteFriend = async (userInfo) => {
  const { userId, friendId } = userInfo;
  await prisma.$queryRaw`
    DELETE FROM friends
    WHERE user_id = ${userId}
      AND friend_id = ${friendId}
  ;`;
  return friendId;
};

export default {
  getTotalFriendCount,
  getFriendListByStatus,
  getFriend,
  addFriend,
  deleteFriend,
};
