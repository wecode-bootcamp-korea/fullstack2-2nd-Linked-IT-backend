import prisma from '../../prisma';

const getProfile = async (userId) => {
  return await prisma.$queryRaw`
      SELECT  u.first_name             firstName
            , u.last_name             lastName
            , u.email
            , u.provider
            , u.sns_id                snsId
            , ui.user_profile_url      userProfileImageUrl
            , ui.user_background_url  userBacgroundImageUrl
            , cinfo.profile_url        profileUrl
            , cinfo.phone_number      phoneNumber
            , c.phone_code            phoneCode
            , c.country_name          countryName
            , c.sort_name             countrySortName
            , states.state_name       stateName
            , cities.city_name        cityName
            , cinfo.phone_type        phoneType
            , cinfo.address
            , cinfo.birth_year        birthYear
            , cinfo.birth_month       birthMonth
            , cinfo.birth_day         birthDay
            , cinfo.user_id           userId
            , cinfo.scope_of_public   userScopeOfPublic
        FROM  users u
   LEFT JOIN  user_images ui
          ON  u.id = ui.user_id
   LEFT JOIN  contact_informations cinfo
          ON  u.id = cinfo.user_id
   LEFT JOIN  countries c
          ON  u.id = c.id
   LEFT JOIN  states
          ON  c.id = states.country_id
   LEFT JOIN  cities
          ON  states.id = cities.state_id
       WHERE  u.id = ${userId}
       ;
      `;
};

const getEducation = async (userId) => {
  return await prisma.$queryRaw`
    SELECT  u.id
          , u.first_name         firstName
          , u.last_name         lastName
          , e.admission_month   admissionMonth
          , e.admission_year    admissionYear
          , e.graduation_month  graduationMonth
          , e.graduation_year   graduationYear
          , e.grade
          , e.activity
          , e.description
          , c.college_name      collegeName
          , c.location          collegeLocation
          , d.type              degreeType
          , m.major_name        majorName
      FROM  educations e
 LEFT JOIN  users u
        ON  e.id = u.id
 LEFT JOIN  colleges c
        ON  e.id = c.id
 LEFT JOIN  degrees d
        ON  e.degree_id = d.id
 LEFT JOIN  majors m
        ON  e.major_id = m.id
     WHERE  u.id = ${userId}
     ;
    `;
};

const getCareer = async (userId) => {
  return await prisma.$queryRaw`
      SELECT  u.id
            , u.first_name                 firstName
            , u.last_name                 lastName
            , pc.is_current_position      isCurrentPosition
            , pc.is_end_current_position  isEndCurrentPosition
            , pc.headline                 careerHeadline
            , pc.description              careerDescription
            , pc.start_month              careerStartMonth
            , pc.start_year               careerStartYear
            , pc.end_month                careerEndMonth
            , pc.end_year                 careerEndYear
            , c.korean_name               companyKoreanName
            , c.english_name              companyEnglishName
            , c.location                  companyLocation
            , ci.company_profile_url       companyProfileImageUrl
            , i.industry_type             industryType
            , p.position_name             positionName
            , et.type                     employmentType
        FROM  position_careers pc
   LEFT JOIN  users u
          ON  u.id = pc.user_id
   LEFT JOIN  companies c
          ON  c.id = pc.company_id
   LEFT JOIN  company_images ci
          ON  c.id = ci.company_id
   LEFT JOIN  industries i
          ON  pc.industry_id = i.id
   LEFT JOIN  positions p
          ON  u.id = p.user_id
   LEFT JOIN  employment_types et
          ON  pc.employment_type_id = et.id
       WHERE  u.id = ${userId}
       ;
      `;
};

export default { getProfile, getEducation, getCareer };
