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

const getMyFriendList = async (userId) => {
  return await prisma.$queryRaw`
    SELECT u.id
         , u.last_name lastName
         , u.first_name firstName
         , i.user_profile_url userProfileUrl
         , c.college_name school
         , m.major_name major
         , d.type degree
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
     WHERE u.id IN (SELECT friend_id
                      FROM friends
                     WHERE user_id = ${userId})
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

export default { getTotalFriendCount, getMyFriendList, getFriend };
