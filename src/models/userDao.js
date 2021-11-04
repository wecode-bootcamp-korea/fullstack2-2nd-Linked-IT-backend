import prisma from '../../prisma';

const getUser = async (userId) => {
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
            , sop.type                scopeOfPublicType
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
   LEFT JOIN  scope_of_publics sop
          ON  cinfo.scope_of_public_id = sop.id
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
        ON  e.user_id = u.id
 LEFT JOIN  colleges c
        ON  e.college_id = c.id
 LEFT JOIN  degrees d
        ON  e.degree_id = d.id
 LEFT JOIN  majors m
        ON  e.major_id = m.id
     WHERE  u.id = ${userId}
    ;
  `;
};

const getPositionCareer = async (userId) => {
  return await prisma.$queryRaw`
      SELECT  u.id                        userId
            , pc.id                       positionCareerId
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
   LEFT JOIN  employment_announcements ea
          ON  ea.user_id = u.id
   LEFT JOIN  company_images ci
          ON  ci.employment_announcement_id = ea.id
   LEFT JOIN  industries i
          ON  pc.industry_id = i.id
   LEFT JOIN  user_positions up
          ON  u.id = up.id
   LEFT JOIN  positions p
          ON  up.position_id = p.id
   LEFT JOIN  employment_types et
          ON  pc.employment_type_id = et.id
       WHERE  u.id = ${userId}
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
    positionId,
    companyId,
    industryId,
    employmentTypeId,
    scopeOfPublicId,
  } = positionCareerData;
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
                                , ${positionId}
                                , ${companyId}
                                , ${industryId}
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
    headline,
    description,
    positionId,
    companyId,
    industryId,
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
          , headline                = ${headline}
          , description             = ${description}
          , position_id             = ${positionId}
          , company_id              = ${companyId}
          , industry_id             = ${industryId}
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

export default {
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