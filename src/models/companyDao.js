import { Prisma } from '.prisma/client';
import prisma from '../../prisma';

const getCompanyListBySearch = async (query) => {
  const keyword = `%${query.keyword}%`;
  const companies = await prisma.$queryRaw`
  SELECT
    c.id,
    c.english_name AS companyName,
    c.location AS companyLocation,
    ci.company_profile_url AS companyProfileImageUrl,
    i.industry_type AS companyCategory,
    (
        SELECT
          COUNT(c.id) AS count
        FROM
          companies c
        ${
          query.keyword
            ? Prisma.sql`WHERE c.english_name LIKE ${keyword}`
            : Prisma.empty
        }
      ) AS companiesCount
    FROM
      companies c
    LEFT JOIN
      company_images ci
    ON
      ci.id = c.id
    LEFT JOIN
      industries i
    ON
      i.id = c.industry_id  
    ${
      query.keyword
        ? Prisma.sql`WHERE c.english_name LIKE ${keyword}`
        : Prisma.empty
    }
    ORDER BY c.id DESC
    LIMIT 3
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
