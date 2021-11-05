import { Prisma } from '.prisma/client';
import prisma from '../../prisma';

const getSearchResult = async (query, limit) => {
  const keyword = `%${query.keyword}%`;
  // if (!keyword) const result = keyword.replace(',');
  const users = await prisma.$queryRaw`
  SELECT
    u.first_name AS firstName,
    u.last_name AS lastName,
    ui.user_profile_url AS userProfileUrl,
    p.position_name AS currentPosition,
    c.english_name AS companyName  
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
    companies c
  ON
    c.id = u.id     
  ${
    query.keyword
      ? Prisma.sql`WHERE u.last_name LIKE ${keyword} OR u.first_name LIKE ${keyword}`
      : Prisma.empty
  }
  ORDER BY u.id DESC
  LIMIT 5
  ;`;

  const companies = await prisma.$queryRaw`
  SELECT
    c.id,
    c.english_name AS companyName,
    c.location AS companyLocation,
    ci.company_profile_url AS companyProfileImageUrl
    FROM
      companies c
    LEFT JOIN
      company_images ci
    ON
      ci.id = c.id
    ${
      query.keyword
        ? Prisma.sql`WHERE c.english_name LIKE ${keyword}`
        : Prisma.empty
    }
    ORDER BY c.id DESC
    LIMIT 5
    ;`;
  const result = [...users, ...companies];
  return result;
};

export default {
  getSearchResult,
};
