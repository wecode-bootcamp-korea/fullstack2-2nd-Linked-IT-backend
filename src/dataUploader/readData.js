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
      if (fileName === 'users')
        await prisma.$queryRaw`
        INSERT INTO
          users (id, first_name, last_name, email, password, provider, sns_id, created_at, updated_at, is_deleted)
        VALUES
          (${data.id}, ${data.first_name}, ${data.last_name}, ${data.email},${data.password},${data.provider},${data.sns_id},${data.created_at}, ${data.updated_at},${data.is_deleted} );`;
      if (fileName === 'employment_types')
        await prisma.$queryRaw`
        INSERT INTO
          employment_types (id, type)
        VALUES
          (${data.id}, ${data.type});`;
      if (fileName === 'work_types')
        await prisma.$queryRaw`
        INSERT INTO
          work_types (id, type)
        VALUES
          (${data.id}, ${data.type});`;
      if (fileName === 'industries')
        await prisma.$queryRaw`
          INSERT INTO
          industries (id,industry_type)
          VALUES
          (${data.id}, ${data.industry_type});`;
      if (fileName === 'companies')
        await prisma.$queryRaw`
        INSERT INTO
          companies (id, korean_name,english_name,introduction,location,number_of_employee, industry_id)
        VALUES
          (${data.id}, ${data.korean_name}, ${data.english_name}, ${data.introduction},${data.location},${data.number_of_employee},${data.industry_id});`;
      if (fileName === 'employment_announcements')
        await prisma.$queryRaw`
            INSERT INTO
              employment_announcements (id, headline, content, created_at, is_easy_apply, employment_type_id, work_type_id, user_id, time_since_posted, salary_information)
            VALUES
              (${data.id}, ${data.headline}, ${data.content}, ${data.created_at}, ${data.is_easy_apply}, ${data.employment_type_id}, ${data.work_type_id}, ${data.user_id}, ${data.time_since_posted}, ${data.salary_information});`;
      if (fileName === 'company_images')
        await prisma.$queryRaw`
        INSERT INTO
          company_images (id,company_profile_url,company_background_url,company_id,employment_announcement_id)
        VALUES
          (${data.id}, ${data.company_profile_url}, ${data.company_background_url}, ${data.company_id},${data.employment_announcement_id});`;
      if (fileName === 'employment_announcement_attachments')
        await prisma.$queryRaw`
        INSERT INTO
          employment_announcement_attachments (id,employment_announcement_id,employment_announcement_image_url)
        VALUES
          (${data.id}, ${data.employment_announcement_id}, ${data.employment_announcement_image_url});`;
      if (fileName === 'positions')
        await prisma.$queryRaw`
        INSERT INTO
          positions (id, position_name)
        VALUES
          (${data.id}, ${data.position_name})`;
      if (fileName === 'applications')
        await prisma.$queryRaw`
        INSERT INTO
          applications (id, user_id, employment_announcement_id)
        VALUES
          (${data.id},${data.user_id},${data.employment_announcement_id});`;
      if (fileName === 'user_positions')
        await prisma.$queryRaw`
        INSERT INTO
          user_positions (id, user_id, position_id)
        VALUES
          (${data.id},${data.user_id}, ${data.position_id});`;
      if (fileName === 'user_images')
        await prisma.$queryRaw`
        INSERT INTO
          user_images (id, user_profile_url, user_background_url, user_id)
        VALUES
          (${data.id},${data.user_profile_url},${data.user_background_url}, ${data.user_id});`;
      if (fileName === 'countries')
        await prisma.$queryRaw`
          INSERT INTO
            countries (id,country_name,sort_name,phone_code)
          VALUES
            (${data.id}, ${data.country_name}, ${data.sort_name}, ${data.phone_code});`;
      if (fileName === 'states')
        await prisma.$queryRaw`
          INSERT INTO
            states (id,state_name,country_id)
          VALUES
            (${data.id}, ${data.state_name}, ${data.country_id});`;
      if (fileName === 'cities')
        await prisma.$queryRaw`
          INSERT INTO
            cities (id,city_name,state_id)
          VALUES
            (${data.id}, ${data.city_name}, ${data.state_id});`;
      if (fileName === 'degrees')
        await prisma.$queryRaw`
          INSERT INTO
            degrees (id,type)
          VALUES
            (${data.id},${data.type});`;
      if (fileName === 'majors')
        await prisma.$queryRaw`
          INSERT INTO
            majors (id,major_name)
          VALUES
            (${data.id}, ${data.major_name});`;
      if (fileName === 'colleges')
        await prisma.$queryRaw`
          INSERT INTO
            colleges (id,college_name,location)
          VALUES
            (${data.id},${data.college_name},${data.location});`;
      if (fileName === 'educations')
        await prisma.$queryRaw`
      INSERT INTO
        educations (id,admission_month,admission_year,graduation_month,graduation_year,grade,activity,description,college_id,degree_id,major_id,user_id,scope_of_public)
      VALUES
        (${data.id}, ${data.admission_month}, ${data.admission_year}, ${data.graduation_month}, ${data.graduation_year}, ${data.grade}, ${data.activity}, ${data.description}, ${data.college_id}, ${data.degree_id}, ${data.major_id}, ${data.user_id}, ${data.scope_of_public});`;
      if (fileName === 'contact_informations')
        await prisma.$queryRaw`
        INSERT INTO
          contact_informations (id,profile_url,phone_number,phone_type,address,birth_year,birth_month,birth_day,user_id,scope_of_public)
        VALUES
          (${data.id}, ${data.profile_url}, ${data.phone_number}, ${data.phone_type}, ${data.address}, ${data.birth_year}, ${data.birth_month}, ${data.birth_day}, ${data.user_id}, ${data.scope_of_public});`;
      if (fileName === 'position_careers')
        await prisma.$queryRaw`
      INSERT INTO
        position_careers (id,is_current_position,is_end_current_position,headline,description,position_id,company_id,industry_id,user_id,employment_type_id,end_month,end_year,start_month,start_year,scope_of_public)
      VALUES
      //   (${data.id}, ${data.is_current_position}, ${data.is_end_current_position}, ${data.headline}, ${data.description}, ${data.position_id}, ${data.company_id}, ${data.industry_id}, ${data.user_id}, ${data.employment_type_id}, ${data.end_month}, ${data.end_year}, ${data.start_month}, ${data.start_year}, ${data.scope_of_public});`;
      if (fileName === 'introductions')
        await prisma.$queryRaw`
      INSERT INTO
        introductions(id,another_name,one_line_profile,position_career_id,country_id,industry_id,user_id)
      VALUES
        (${data.id}, ${data.another_name}, ${data.one_line_profile}, ${data.position_career_id}, ${data.country_id}, ${data.industry_id}, ${data.user_id});`;
      if (fileName === 'positions')
        await prisma.$queryRaw`
      INSERT INTO
        positions (id,position_name,user_id)
      VALUES
        (${data.id}, ${data.position_name}, ${data.user_id});`;
      if (fileName === 'friends')
        await prisma.$queryRaw`
            INSERT INTO
          friends (user_id,friend_id,friends_status_id)
            VALUES
              (${data.user_id}, ${data.friend_id}, ${data.friends_status_id});`;
      if (fileName === 'friend_statuses')
        await prisma.$queryRaw`
          INSERT INTO
          friend_statuses (id,type)
          VALUES
            (${data.id}, ${data.type});`;
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
    'users',
    'employment_types',
    'work_types',
    'industries',
    'companies',
    'employment_announcements',
    'company_images',
    'employment_announcement_attachments',
    'positions',
    'user_positions',
    'applications',
    'user_images',
    'majors',
    'colleges',
    'degrees',
    'positions',
    'states',
    'cities',
    'countries',
    'contact_informations',
    'educations',
    'position_careers',
    'introductions',
    'friends',
    'friend_statuses',
  ];

  for await (let file of files) {
    await InsertData(file);
  }
}
insertAllData();
