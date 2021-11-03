import prisma from '../../prisma';
import { Prisma } from '@prisma/client';

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

const getMyFriendList = async (userId) => {
  return await prisma.$queryRaw`
    select u.id
         , u.last_name lastName
         , u.first_name firstName
         , i.user_profile_url userProfileUrl
         , c.college_name school
         , m.major_name major
         , d.type degree
      from users u
         , user_images i
         , educations e
         , colleges c
         , majors m
         , degrees d
     where i.user_id = u.id
       and e.user_id = u.id
       and c.id = e.college_id
       and m.id = e.major_id
       and d.id = e.degree_id
       and u.id in (select friend_id
                      from friends
                     where user_id = ${userId})
  ;`;
};

export default { getFriend, getMyFriendList };
