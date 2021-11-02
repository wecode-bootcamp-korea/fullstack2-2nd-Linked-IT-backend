import { Prisma } from '.prisma/client';
import prisma from '../../prisma';
import { getTimeSincePosted } from '../utils/getTimeSincePosted';

const result = async (filterWord) => {};
result();

const getJobPostingList = async (filterWord) => {
  console.log(filterWord);
  let date = await prisma.$queryRaw`
    SELECT
      ea.created_at
    FROM
      employment_announcements ea
    WHERE
      ea.created_at BETWEEN DATE_ADD(NOW(), INTERVAL -1 DAY) AND NOW()`;
  console.log(date);

  let getPostCreatedAt = await prisma.$queryRaw`
    SELECT
      ea.created_at AS createdAt
    FROM 
      employment_announcements ea
  `;

  for (let i = 0; i < getPostCreatedAt.length; i++) {
    const nowDate = new Date();
    const postDate = new Date(getPostCreatedAt[i].createdAt);

    const hourUnit = getTimeSincePosted.inDays(nowDate, postDate) < 1;
    const dayUnit = getTimeSincePosted.inDays(nowDate, postDate) < 7;
    const weekUnit = getTimeSincePosted.inDays(nowDate, postDate) <= 28;
    const monthUnit = getTimeSincePosted.inDays(nowDate, postDate) >= 29;

    if (hourUnit) {
      await prisma.$queryRaw`
      UPDATE
        employment_announcements
      SET
        time_since_posted =  CONCAT(${getTimeSincePosted.inHours(
          nowDate,
          postDate
        )}, '시간 전') 
      WHERE id = ${i + 1}`;
    } else if (dayUnit) {
      await prisma.$queryRaw`
      UPDATE
        employment_announcements
      SET
        time_since_posted =  CONCAT(${getTimeSincePosted.inDays(
          nowDate,
          postDate
        )}, '일 전') 
      WHERE id = ${i + 1}`;
    } else if (weekUnit) {
      await prisma.$queryRaw`
      UPDATE
        employment_announcements
      SET
        time_since_posted =  CONCAT(${getTimeSincePosted.inWeeks(
          nowDate,
          postDate
        )}, '주 전')
      WHERE id = ${i + 1}`;
    } else if (monthUnit) {
      await prisma.$queryRaw`
      UPDATE
        employment_announcements
      SET
        time_since_posted =  CONCAT(${getTimeSincePosted.inMonths(
          nowDate,
          postDate
        )}, '개월 전')
      WHERE id = ${i + 1};
      ;`;
    } else {
      new Error('Wrong Time');
    }
  }

  return await prisma.$queryRaw`
    SELECT
      ea.id AS jobPostingId,
      ci.company_profile_url AS companyProfileImgUrl,
      ea.headline AS jobPostingTitle,
      c.id AS companyId,
      c.english_name AS companyName,
      c.location AS companyLocation,
      wt.type AS workType, 
      ea.time_since_posted AS timeSincePosted,
        (
          SELECT
            COUNT(employment_announcement_id) AS count
          FROM
            applications a
          WHERE
            a.employment_announcement_id = ea.id
        ) AS applicantCount,
      ea.is_easy_apply AS isEasyApply
    FROM 
      employment_announcements ea
    LEFT JOIN
      company_images ci
    ON
      ea.id = ci.id
    LEFT JOIN
      work_types wt 
    ON
      ea.work_type_id = wt.id
    LEFT JOIN
      companies c
    ON
      ci.id = c.id
    LEFT JOIN
      employment_types et
    ON
      et.id = ea.employment_type_id
      ${
        filterWord.f_AL
          ? Prisma.sql`WHERE ea.is_easy_apply = ${filterWord.f_AL}`
          : Prisma.empty
      }
      ${
        filterWord.f_WT
          ? Prisma.sql`WHERE wt.id = ${filterWord.f_WT}`
          : Prisma.empty
      }
      ${
        filterWord.f_ET
          ? Prisma.sql`WHERE wt.id = ${filterWord.f_WT}`
          : Prisma.empty
      }
      ${
        filterWord.f_JT
          ? Prisma.sql`WHERE et.id = ${filterWord.f_JT}`
          : Prisma.empty
      }
      ${
        filterWord.f_C
          ? Prisma.sql`WHERE c.id = ${filterWord.f_C}`
          : Prisma.empty
      }
      ${
        filterWord.f_TPR === 'DAY'
          ? Prisma.sql`WHERE ea.created_at BETWEEN DATE_ADD(NOW(), INTERVAL -1 DAY) AND NOW()`
          : Prisma.empty
      }
      ${
        filterWord.f_TPR === 'WEEK'
          ? Prisma.sql`WHERE ea.created_at BETWEEN DATE_ADD(NOW(), INTERVAL -1 WEEK) AND NOW()`
          : Prisma.empty
      }
      ${
        filterWord.f_TPR === 'MONTH'
          ? Prisma.sql`WHERE ea.created_at BETWEEN DATE_ADD(NOW(), INTERVAL -1 MONTH) AND NOW()`
          : Prisma.empty
      }
    `;
};

const getJobPostingDetail = async () => {
  return await prisma.$queryRaw`
  SELECT
    ea.id AS jobPostingId,
    ea.headline AS jobPostingTitle,
    wt.type AS workType,
    ea.time_since_posted AS timeSincePosted,
    (
      SELECT
      COUNT(employment_announcement_id) AS count
      FROM
      applications a
      WHERE
      a.employment_announcement_id = ea.id
      ) AS applicantCount,
    ea.is_easy_apply AS isEasyApply,
    et.type AS employmentType,
    ea.headline AS description,
    ea.salary_information AS salaryRange,
    c.id AS companyId,
    ci.company_profile_url AS companyProfileImageUrl,
    c.english_name AS companyName,
    i.industry_type AS companyCategory,
    c.location AS companyLocation,
    c.number_of_employee AS staffCount,
    c.introduction AS companyIntroduction,
      (SELECT
      GROUP_CONCAT(eaa.employment_announcement_image_url, '')
      FROM
      employment_announcement_attachments eaa
      WHERE
      eaa.employment_announcement_id = ea.id
      ) AS companyDetailImages,
    u.id AS AuthorId,  
    u.first_name AS AuthorFirstName,
    u.last_name AS AuthorLastName,
    ui.user_profile_url AS AuthorProfileImageUrl,
    p.position_name AS AuthorPosition,
    ea.content AS jobPostingContent
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
        employment_announcements ea
      ON
        ea.id = u.id
      LEFT JOIN
        work_types wt 
      ON
        ea.work_type_id = wt.id
      LEFT JOIN
        companies c
      ON
        c.id = u.id
      LEFT JOIN
        company_images ci
      ON
        ea.id = ci.id
      LEFT JOIN
        industries i
      ON
        i.id = c.industry_id
      LEFT JOIN
        employment_types et
      ON
        et.id = ea.employment_type_id
      `;
};

// const getJobPostingByFiltering = async (query) => {
//   return await prisma.$queryRaw`
//   SELECT
//       c.id,
//       c.english_name AS companyName,
//       c.location AS companyLocation,
//       c.introduction AS companySummary,
//       c.number_of_employee AS TotalNumberOfEmployees,
//       ci.company_profile_url AS companyProfileImageUrl,
//       i.industry_type AS companyCategory,
//       (
//           SELECT
//             COUNT(employment_announcement_id) AS count
//           FROM
//             applications a
//           WHERE
//             a.employment_announcement_id = ea.id
//         ) AS countOfApply
//     FROM
//       companies c
//     LEFT JOIN
//       industries i
//     ON
//       i.id = c.industry_id
//     LEFT JOIN
//       company_images ci
//     ON
//       ci.id = c.id
//     LEFT JOIN
//       employment_announcements ea
//     ON
//       ea.id = c.id
//   ;`;
// };
// 회사 리스트는 나중에 검색 창에서 재사용 목적으로 남겨 둠

export default {
  getJobPostingList,
  getJobPostingDetail,
};
