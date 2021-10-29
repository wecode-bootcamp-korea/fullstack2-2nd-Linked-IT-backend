import prisma from '../../prisma';

const getProfile = async () => {
  return await prisma.$queryRaw`
  SELECT  u.frist_name                    AS user_first_name
        , u.last_name                     AS user_last_name
        , u.email                         AS user_email
        , u.provider                      AS user_provider
        , ci.profile_url                   AS user_profile_url
        , ci.phone_number                 AS user_phone_number
        , ci.phone_type                   AS user_phone_type
        , ci.address                      AS user_address
        , ci.email                        AS user_email
        , ci.birth_year                   AS user_birth_year
        , ci.birth_month                  AS user_birth_month
        , ci.birth_day                    AS user_birth_day
        , ui.user_profile_url
        , ui.user_background_url
        , countries.country_name
        , cities.city_name
        , states.state_name
        , itr.industry_type
        , itr.another_name
        , itr.one_line_profile
        , c.korean_name                   AS company_korean_name
        , c.english_name                  AS company_english_name
        , c.introduction                  AS company_introduction
        , c.location                      AS company_location
        , cimg.company_profile_url
        , cimg.company_background_url
        , p.current_position
        , pc.is_working_as_position_now
        , pc.is_ended_positon_now
        , pc.start_date_at                AS position_start_date 
        , pc.end_date_at                  AS position_end_date
        , pc.headline                     AS position_headline
        , pc.description                  AS position_description
        , employment_types.type           AS employment_type
        , work_types.type                 AS work_type
        , degrees.type                    AS degree_type
        , e.admission_month
        , e.admission_year
        , e.graduation_month
        , e.graduation_year
        , e.grade
        , e.activity                      AS education_activity
        , e.description                   AS education_description
        , colleges.name                   AS college_name
        , colleges.location               AS college_location
        , majors.name                     AS major_name 
  FROM    users u
        , user_images ui
        , contact_informations ci
        , countries
        , cities
        , states
        , introductions itr
        , companies c
        , company_images cimg
        , position p
        , position_careers pc
        , employment_types
        , work_types 
        , industries i
        , degrees
        , educations e
        , colleges
        , majors
  WHERE u.id = ${id}
  `;
};

export default { getProfile };
