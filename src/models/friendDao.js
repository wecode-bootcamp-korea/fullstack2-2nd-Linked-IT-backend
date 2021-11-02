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

export default { getFriend };
