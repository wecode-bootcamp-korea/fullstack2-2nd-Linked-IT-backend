import { Prisma } from '.prisma/client';
import prisma from '../../prisma';

const getCompanyListBySearch = async (query) => {
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

const getAllCompanyListByClick = async (query, limit, offset) => {
  const allCompany = await prisma.$queryRaw``;
};

export default {
  getCompanyListBySearch,
  getAllCompanyListByClick,
};
