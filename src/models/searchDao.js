import { Prisma } from '.prisma/client';
import prisma from '../../prisma';

// 회사 리스트는 나중에 검색 창에서 재사용 목적으로 남겨 둠
const getSearchCompanyList = async (query) => {
  const keyword = `%${query.keyword}%`;
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
      ;`;
  return companies;
};

const getSearchUserList = async (query) => {
  const keyword = `%${query.keyword}%`;
  const users = await prisma.$queryRaw`
  SELECT
    u.first_name AS userFirstName,
    u.last_name AS userLastName,
    ui.user_profile_url AS userProfileImageUrl
  FROM
    users u
  LEFT JOIN
    user_images ui
  ON
    ui.id = u.id
  ${
    query.keyword ? Prisma.sql`WHERE u.last_name LIKE ${keyword}` : Prisma.empty
  }
  ;`;
  return users;
};

const getSearchAllList = async (query) => {
  const keyword = `%${query.keyword}%`;
  const users = await prisma.$queryRaw`
  SELECT
    u.first_name AS userFirstName,
    u.last_name AS userLastName,
    ui.user_profile_url AS userProfileImageUrl
  FROM
    users u
  LEFT JOIN
    user_images ui
  ON
    ui.id = u.id
  ${
    query.keyword
      ? Prisma.sql`WHERE u.last_name OR u.first_name LIKE ${keyword}`
      : Prisma.empty
  }
  ORDER BY u.id DESC
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
      ;`;
  const result = [...users, ...companies];
  return result;
};

export default {
  getSearchCompanyList,
  getSearchUserList,
  getSearchAllList,
};
