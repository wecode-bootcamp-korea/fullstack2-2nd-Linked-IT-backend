const csv = require('csv-parser');
const fs = require('fs');
const { Prisma, PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const csvData = [];

const InsertData = (fileName) => {
  const filePath = `dataUploader/data/${fileName}.csv`;
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', async (data) => {
      let query = '';
      // if (fileName === 'users')
      //   await prisma.$queryRaw`
      //   INSERT INTO
      //     users (id, first_name, last_name, email, password, provider, sns_id, created_at, updated_at, is_deleted)
      //   VALUES
      //     (${data.id}, ${data.first_name}, ${data.last_name}, ${data.email},${data.password},${data.provider},${data.sns_id},${data.created_at}, ${data.updated_at},${data.is_deleted} );`;
      // if (fileName === 'employment_types')
      //   await prisma.$queryRaw`
      //   INSERT INTO
      //     employment_types (id, type)
      //   VALUES
      //     (${data.id}, ${data.type});`;
      // if (fileName === 'work_types')
      //   await prisma.$queryRaw`
      //   INSERT INTO
      //     work_types (id, type)
      //   VALUES
      //     (${data.id}, ${data.type});`;
      // if (fileName === 'industries')
      //   await prisma.$queryRaw`
      //     INSERT INTO
      //     industries (id,industry_type)
      //     VALUES
      //     (${data.id}, ${data.industry_type});`;
      // if (fileName === 'companies')
      //   await prisma.$queryRaw`
      //   INSERT INTO
      //     companies (id, korean_name,english_name,introduction,location,number_of_employee, industry_id)
      //   VALUES
      //     (${data.id}, ${data.korean_name}, ${data.english_name}, ${data.introduction},${data.location},${data.number_of_employee},${data.industry_id});`;
      // if (fileName === 'employment_announcements')
      //   await prisma.$queryRaw`
      //       INSERT INTO
      //         employment_announcements (id, headline, content, created_at, number_of_applicant, is_easy_apply, employment_type_id, work_type_id, user_id, time_since_posted)
      //       VALUES
      //         (${data.id}, ${data.headline}, ${data.content}, ${data.created_at}, ${data.number_of_applicant}, ${data.is_easy_apply}, ${data.employment_type_id}, ${data.work_type_id}, ${data.user_id}, ${data.time_since_posted});`;
      // if (fileName === 'company_images')
      //   await prisma.$queryRaw`
      //   INSERT INTO
      //     company_images (id,company_profile_url,company_background_url,company_id,employment_announcement_id)
      //   VALUES
      //     (${data.id}, ${data.company_profile_url}, ${data.company_background_url}, ${data.company_id},${data.employment_announcement_id});`;
      if (fileName === 'positions')
        await prisma.$queryRaw`
        INSERT INTO
          positions (id, position_name)
        VALUES
          (${data.id}, ${data.position_name})`;
      try {
        csvData.push(data);
        await prisma.$queryRaw`
          ${query}`;
      } catch (err) {
        console.log(err);
      }
    })
    .on('end', async () => {
      await console.log('csvData: ', csvData);
      prisma.$disconnect();
    });
};
async function insertAllData() {
  const files = [
    // 'users',
    // 'employment_types',
    // 'work_types',
    // 'industries',
    // 'companies',
    // 'employment_announcements',
    // 'company_images',
    'positions',
  ];

  for await (let file of files) {
    await InsertData(file);
  }
}
insertAllData();
