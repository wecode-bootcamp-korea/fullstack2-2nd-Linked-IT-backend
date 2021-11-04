import { Prisma } from '.prisma/client';
import prisma from '../../prisma';

const getUser = async (userId) => {
  return await prisma.$queryRaw`
      SELECT  u.id                       userId
            , u.first_name                firstName
            , u.last_name                lastName
            , intro.one_line_profile      oneLineProfile
            , countries.country_name     country
            , countries.sort_name        countrySortName
            , states.state_name          state
            , cities.city_name           city
            , positions.position_name    prosition
            , industries.industry_type   industry
            , ci.company_profile_url      companyLogo
            , companies.korean_name      companyName
            , companies.english_name     companyEngName
            , colleges.college_name      schoolName
            , countries.phone_code       phone
            , u.email
            , u.provider
            , u.sns_id                   snsId
            , ui.user_profile_url         userProfileUrl
            , ui.user_background_url     backgroundImg
            , cinfo.profile_url           profileUrl
            , cinfo.phone_number         phoneNumber
            , states.state_name          stateName
            , cities.city_name           cityName
            , cinfo.phone_type           phoneType
            , cinfo.address
            , cinfo.birth_year           birthYear
            , cinfo.birth_month          birthMonth
            , cinfo.birth_day            birthDay
            , cinfo.user_id              userId
            , sop.type                   scopeOfPublicType
        FROM  users u
   LEFT JOIN  user_images ui
          ON  u.id = ui.user_id
   LEFT JOIN  contact_informations cinfo
          ON  u.id = cinfo.user_id
   LEFT JOIN  position_careers pc
          ON  pc.user_id = u.id
   LEFT JOIN  introductions intro
          ON  intro.position_career_id = pc.id
   LEFT JOIN  countries
          ON  intro.country_id = countries.id
   LEFT JOIN  states
          ON  countries.id = states.country_id
   LEFT JOIN  cities
          ON  states.id = cities.state_id
   LEFT JOIN  positions
          ON  pc.position_id = positions.id
   LEFT JOIN  industries
          ON  pc.industry_id = industries.id
   LEFT JOIN  scope_of_publics sop
          ON  cinfo.scope_of_public_id = sop.id
   LEFT JOIN  educations e
          ON  e.user_id = u.id
   LEFT JOIN  colleges
          ON  e.college_id = colleges.id
   LEFT JOIN  companies
          ON  pc.company_id = companies.id
   LEFT JOIN  company_images ci
          ON  ci.company_id = companies.id
       WHERE  u.id = ${userId}
    ;
  `;
};

const getEducation = async (userId) => {
  return await prisma.$queryRaw`
    SELECT  u.id                  userId
          , u.first_name           firstName
          , u.last_name           lastName
          , ci.college_image_url  schoolLogo
          , c.college_name        schoolName
          , c.location            schoolLocation
          , d.type                degree
          , m.major_name          major
          , e.grade               gpa
          , e.admission_month     admissionMonth
          , e.admission_year      admissionYear
          , e.graduation_month    graduationMonth
          , e.graduation_year     graduationYear
          , e.activity
          , e.description
      FROM  users u
 LEFT JOIN  educations e
        ON  e.user_id = u.id
 LEFT JOIN  colleges c
        ON  e.college_id = c.id
 LEFT JOIN  degrees d
        ON  e.degree_id = d.id
 LEFT JOIN  majors m
        ON  e.major_id = m.id
 LEFT JOIN  college_images ci
        ON  ci.college_id = c.id
     WHERE  u.id = ${userId}
    ;
  `;
};

const getPositionCareer = async (userId) => {
  return await prisma.$queryRaw`
      SELECT  u.id                        userId
            , u.first_name                 firstName
            , u.last_name                 lastName
            , ci.company_profile_url       companyLogo
            , p.position_name             position
            , companies.korean_name       companyName
            , companies.english_name      companyEngName
            , et.type                     employmentType
            , pc.start_month              startMonth
            , pc.start_year               startYear
            , pc.end_month                endMonth
            , pc.end_year                 endYear
            , companies.location          region
            , i.industry_type             industry
            , pc.headline                 headline
            , pc.description
            , pc.is_current_position      isWorkingNow
            , pc.is_end_current_position  isEndWorking
            , companies.location          location
        FROM  users u
   LEFT JOIN  position_careers pc
          ON  u.id = pc.user_id
   LEFT JOIN  companies
          ON  companies.id = pc.company_id
   LEFT JOIN  employment_announcements ea
          ON  ea.user_id = u.id
   LEFT JOIN  company_images ci
          ON  ci.employment_announcement_id = ea.id
   LEFT JOIN  industries i
          ON  pc.industry_id = i.id
   LEFT JOIN  user_positions up
          ON  u.id = up.user_id
   LEFT JOIN  positions p
          ON  up.position_id = p.id
   LEFT JOIN  employment_types et
          ON  pc.employment_type_id = et.id
   LEFT JOIN  introductions intro
          ON  intro.position_career_id = pc.id
       WHERE  pc.user_id = ${userId}
    ;
  `;
};

const updateIntro = async (userId, userData) => {
  const {
    firstName,
    lastName,
    anotherName,
    oneLineProfile,
    headline,
    industryId,
    countryId,
  } = userData;
  return await prisma.$queryRaw`
      UPDATE 	users u
  INNER JOIN  introductions intro
  		    ON	u.id = intro.user_id
  INNER JOIN	position_careers pc
  		    ON	u.id = pc.user_id
  INNER JOIN	industries	i
  		    ON	pc.industry_id = i.id
  INNER JOIN	countries
  		    ON	intro.country_id = countries.id
		     SET	u.first_name 			      =	${firstName}
		 	      ,	u.last_name 			     = ${lastName}
            ,	intro.another_name		 = ${anotherName}
            ,	intro.one_line_profile	=	${oneLineProfile}
            ,	pc.headline				     = ${headline}
            ,	pc.industry_id			   = ${industryId}
            ,	intro.country_id		   = ${countryId}
	    WHERE	  u.id = ${userId}
      ;
  `;
};

const updateContact = async (userId, userData) => {
  const { phoneNumber, phoneType, address, birthMonth, birthDay } = userData;
  return await prisma.$queryRaw`
      UPDATE  contact_informations
         SET  phone_number  = ${phoneNumber}
            , phone_type    = ${phoneType}
            , address       = ${address}
            , birth_month   = ${birthMonth}
            , birth_day     = ${birthDay}
       WHERE  contact_informations.user_id = ${userId}
      ;
  `;
};

const createPositionCareer = async (userId, positionCareerData) => {
  const {
    isCurrentPosition,
    isEndCurrentPosition,
    startMonth,
    startYear,
    endMonth,
    endYear,
    headline,
    description,
    position,
    companyName,
    industry,
    employmentTypeId,
    scopeOfPublicId,
  } = positionCareerData;
  await prisma.$queryRaw`
    INSERT INTO 
      positions (position_name)
         VALUES (${position})
  `;
  await prisma.$queryRaw`
    INSERT INTO 
     industries (industry_type)
         VALUES (${industry})
  `;
  return await prisma.$queryRaw`
    INSERT INTO position_careers (is_current_position
                                , is_end_current_position
                                , start_month, start_year
                                , end_month
                                , end_year
                                , headline
                                , description
                                , position_id
                                , company_id
                                , industry_id
                                , user_id
                                , employment_type_id
                                , scope_of_public_id)
                          VALUES (${isCurrentPosition}
                                , ${isEndCurrentPosition}
                                , ${startMonth}
                                , ${startYear}
                                , ${endMonth}
                                , ${endYear}
                                , ${headline}
                                , ${description}
                                , (SELECT positions.id
                                     FROM positions
                                    WHERE positions.position_name LIKE ${position})
                                , (SELECT companies.id
                                     FROM companies
                                    WHERE companies.korean_name LIKE ${companyName})
                                , (SELECT industries.id
                                     FROM industries
                                    WHERE industries.industry_type LIKE ${industry})
                                , ${userId}
                                , ${employmentTypeId}
                                , ${scopeOfPublicId})
    ;
  `;
};

const updatePositionCareer = async (
  userId,
  positionCareerId,
  positionCareerData
) => {
  const {
    isCurrentPosition,
    isEndCurrentPosition,
    startMonth,
    startYear,
    endMonth,
    endYear,
    description,
    positionId,
    companyName,
    industry,
    employmentTypeId,
    scopeOfPublicId,
  } = positionCareerData;
  return await prisma.$queryRaw` 
  UPDATE  position_careers
     SET    is_current_position     = ${isCurrentPosition}
          , is_end_current_position = ${isEndCurrentPosition}
          , start_month             = ${startMonth}
          , start_year              = ${startYear}
          , end_month               = ${endMonth}
          , end_year                = ${endYear}
          , description             = ${description}
          , position_id             = ${positionId}
          , company_id              = (SELECT companies.id
                                         FROM companies
                                        WHERE companies.korean_name LIKE ${companyName})
          , industry_id             = (SELECT industries.id
                                         FROM industries
                                        WHERE industries.industry_type LIKE ${industry})
          , user_id                 = ${userId}
          , employment_type_id      = ${employmentTypeId}
          , scope_of_public_id      = ${scopeOfPublicId}
   WHERE  position_careers.user_id = ${userId}
     AND  position_careers.id      = ${positionCareerId}
  `;
};

const deletePositionCareer = async (userId, positionCareerId) => {
  return await prisma.$queryRaw`
    DELETE FROM position_careers
          WHERE position_careers.user_id = ${userId}
            AND position_careers.id      = ${positionCareerId}
  `;
};

const createEducation = async (userId, educationData) => {
  const {
    admissionMonth,
    admissionYear,
    graduationMonth,
    graduationYear,
    grade,
    activity,
    description,
    collegeId,
    degreeId,
    majorId,
    scopeOfPublicId,
  } = educationData;
  return await prisma.$queryRaw`
    INSERT INTO educations (admission_month
                          , admission_year
                          , graduation_month
                          , graduation_year
                          , grade
                          , activity
                          , description
                          , college_id
                          , degree_id
                          , major_id
                          , user_id
                          , scope_of_public_id)
                    VALUES (${admissionMonth}
                          , ${admissionYear}
                          , ${graduationMonth}
                          , ${graduationYear}
                          , ${grade}
                          , ${activity}
                          , ${description}
                          , ${collegeId}
                          , ${degreeId}
                          , ${majorId}
                          , ${userId}
                          , ${scopeOfPublicId})
    ;                        
  `;
};

const updateEducation = async (userId, educationId, educationData) => {
  const {
    admissionMonth,
    admissionYear,
    graduationMonth,
    graduationYear,
    grade,
    activity,
    description,
    collegeId,
    degreeId,
    majorId,
    scopeOfPublicId,
  } = educationData;
  return await prisma.$queryRaw`
    UPDATE  educations
       SET  admission_month     = ${admissionMonth}
          , admission_year      = ${admissionYear}
          , graduation_month    = ${graduationMonth}
          , graduation_year     = ${graduationYear}
          , grade               = ${grade}
          , activity            = ${activity}
          , description         = ${description}
          , college_id          = ${collegeId}
          , degree_id           = ${degreeId}
          , major_id            = ${majorId}
          , scope_of_public_id  = ${scopeOfPublicId}
    WHERE  educations.user_id = ${userId}
      AND  educations.id      = ${educationId}
    ;   
  `;
};

const deleteEducation = async (userId, educationId) => {
  return await prisma.$queryRaw`
    DELETE FROM educations
          WHERE educations.user_id = ${userId}
            AND educations.id      = ${educationId}
    ;        
  `;
};

const createWebsite = async (userId, websiteData) => {
  const { websiteUrl, websiteType } = websiteData;
  return await prisma.$queryRaw`
    INSERT INTO websites (website_url
                        , website_type
                        , contact_information_id)
         VALUES (${websiteUrl}
               , ${websiteType}
               , (SELECT id
                    FROM contact_informations
                   WHERE contact_informations.user_id = ${userId}))
    ;
  `;
};

const deleteWebsite = async (userId, websiteId) => {
  return await prisma.$queryRaw`
    DELETE FROM websites
          WHERE websites.contact_information_id = (SELECT id
                                                     FROM contact_informations
                                                    WHERE user_id = ${userId})
            AND websites.id = ${websiteId}
    ;
  `;
};

const createInstantMessenger = async (userId, instantMessengerData) => {
  const { messengerId, messengerType } = instantMessengerData;
  return await prisma.$queryRaw`
    INSERT INTO instant_messengers (messenger_id
                                  , messenger_type
                                  , contact_information_id)
        VALUES (${messengerId}
              , ${messengerType}
              ,(SELECT id
                  FROM contact_informations
                 WHERE contact_informations.user_id = ${userId}))
    ;           
  `;
};

const deleteInstantMessenger = async (userId, instantMessengerId) => {
  return await prisma.$queryRaw`
    DELETE FROM instant_messengers  im
          WHERE im.contact_information_id = (SELECT id
                                               FROM contact_informations
                                              WHERE user_id = ${userId})
            AND im.id = ${instantMessengerId}
    ;  
  `;
};

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
  getUser,
  getEducation,
  getPositionCareer,
  updateIntro,
  updateContact,
  createPositionCareer,
  updatePositionCareer,
  deletePositionCareer,
  createEducation,
  updateEducation,
  deleteEducation,
  createWebsite,
  deleteWebsite,
  createInstantMessenger,
  deleteInstantMessenger,
};
