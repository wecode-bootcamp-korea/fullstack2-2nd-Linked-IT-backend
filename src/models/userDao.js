import { Prisma } from '.prisma/client';
import prisma from '../../prisma';

const getUserListBySearch = async (query, limit) => {
  console.log(query.limit);
  const keyword = `%${query.keyword}%`;
  const users = await prisma.$queryRaw`
  SELECT
    u.first_name AS userFirstName,
    u.last_name AS userLastName,
    ui.user_profile_url AS userProfileImageUrl,
    pc.headline AS userCurrentPosition,
    p.position_name AS userPriorPosition,
    c.location AS companyLocation,
      (
        SELECT
          COUNT(u.id) AS count
        FROM
          users u
        ${
          query.keyword
            ? Prisma.sql`WHERE pc.headline LIKE ${keyword} OR u.last_name LIKE ${keyword} OR u.first_name LIKE ${keyword}`
            : Prisma.empty
        }
      ) AS userCount
  FROM
    users u
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
    companies c
  ON
    c.id = u.id  
  ${
    query.keyword
      ? Prisma.sql`WHERE u.last_name LIKE ${keyword} OR u.first_name LIKE ${keyword} OR pc.headline LIKE ${keyword}`
      : Prisma.empty
  }
  ${query.limit ? Prisma.sql`LIMIT ${query.limit}` : Prisma.empty}
  `;
  return users;
};

const getAllUserListByClick = async (query, limit, offset) => {
  const allUsers = await prisma.$queryRaw``;
};

export default {
  getUserListBySearch,
  getAllUserListByClick,
};
