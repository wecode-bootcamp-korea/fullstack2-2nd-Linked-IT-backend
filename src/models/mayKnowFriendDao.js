import prisma from '../../prisma';
import { Prisma } from '@prisma/client';

const getMayKnowFriends = async (userId) => {
  const friendsRelationList = await prisma.$queryRaw`
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

  const newArr = friendsRelationList.map((el) => el.friend_id);
  const newSet = new Set(newArr);
  const mayKnowList = [...newSet];

  const getMayKnow = await prisma.$queryRaw`
    SELECT  u.id
          , u.first_name
          , u.last_name 
          , pc.headline
          , pc.description
      FROM  users u
 LEFT JOIN  position_careers pc
        ON  pc.user_id = u.id
     WHERE  u.id IN (${Prisma.join(mayKnowList)})
     ;
    `;
  return getMayKnow;
};

export default { getMayKnowFriends };
