import { userDao } from '../models';

const getUser = async (userId) => {
  const DBuserData = await userDao.getUser(userId);
  if (!DBuserData.length) throw '존재하지 않는 유저정보 입니다.';
  return await userDao.getUser(userId);
};

const getEducation = async (userId) => {
  const DBuserData = await userDao.getEducation(userId);
  if (!DBuserData.length) throw '존재하지 않는 유저정보 입니다.';
  return await userDao.getEducation(userId);
};

const getPositionCareer = async (userId) => {
  const DBuserData = await userDao.getPositionCareer(userId);
  if (!DBuserData.length) {
    throw '존재하지 않는 유저정보 입니다.';
  } else return await userDao.getPositionCareer(userId);
};

const updateIntro = async (userId, userData) => {
  const { firstName, lastName, oneLineProfile, industry, country } = userData;
  if (!firstName.length) throw 'firstName은 필수입력 정보 입니다.';
  if (!lastName.length) throw 'lastName은 필수입력 정보 입니다.';
  if (!oneLineProfile.length) throw 'oneLineProfile은 필수입력 정보 입니다.';
  if (!industry.length) throw 'industry는 필수입력 정보 입니다.';
  if (!country.length) throw 'country는 필수입력 정보 입니다.';
  return await userDao.updateIntro(userId, userData);
};

const updateContact = async (userId, userData) => {
  return await userDao.updateContact(userId, userData);
};

const createPositionCareer = async (userId, positionCareerData) => {
  const {
    isCurrentPosition,
    isEndCurrentPosition,
    position,
    companyName,
    industry,
    employmentTypeId,
    scopeOfPublicId,
  } = positionCareerData;
  if (isCurrentPosition === undefined)
    throw 'isCurrentPosition은 필수입력 정보 입니다.';
  if (isEndCurrentPosition === undefined)
    throw 'isEndCurrentPosition은 필수입력 정보 입니다.';
  if (!position.length) throw 'position은 필수입력 정보 입니다.';
  if (!companyName.length) throw 'companyName은 필수입력 정보 입니다';
  if (!industry.length) throw 'industry는 필수입력 정보 입니다';
  if (employmentTypeId === undefined)
    throw 'employmentTypeId는 필수입력 정보 입니다';
  if (scopeOfPublicId == undefined)
    throw 'scopeOfPublicId는 필수입력 정보 입니다';
  return await userDao.createPositionCareer(userId, positionCareerData);
};

const updatePositionCareer = async (
  userId,
  positionCareerId,
  positionCareerData
) => {
  const {
    isCurrentPosition,
    isEndCurrentPosition,
    position,
    companyName,
    industry,
    employmentTypeId,
    scopeOfPublicId,
  } = positionCareerData;
  if (isCurrentPosition === undefined)
    throw 'isCurrentPosition은 필수입력 정보 입니다.';
  if (isEndCurrentPosition === undefined)
    throw 'isEndCurrentPosition은 필수입력 정보 입니다.';
  if (!position.length) throw 'position은 필수입력 정보 입니다.';
  if (!companyName.length) throw 'companyName은 필수입력 정보 입니다';
  if (!industry.lrngth) throw 'industry는 필수입력 정보 입니다';
  if (employmentTypeId === undefined)
    throw 'employmentTypeId는 필수입력 정보 입니다';
  if (scopeOfPublicId === undefined)
    throw 'scopeOfPublicId는 필수입력 정보 입니다';
  return await userDao.updatePositionCareer(
    userId,
    positionCareerId,
    positionCareerData
  );
};

const deletePositionCareer = async (userId, positionCareerId) => {
  return await userDao.deletePositionCareer(userId, positionCareerId);
};

const getCollegeSelect = async (college) => {
  return await userDao.getCollegeSelect(college);
};

const createEducation = async (userId, educationData) => {
  const { college, degreeId, major, scopeOfPublicId } = educationData;
  if (!college.length) throw 'college는 필수입력 정보 입니다.';
  if (college === undefined) '존재하지 않는 학교 정보 입니다.';
  if (degreeId === undefined) 'degreeId는 필수입력 정보 입니다.';
  if (!major.length) throw 'major은 필수입력 정보 입니다';
  if (scopeOfPublicId === undefined)
    throw 'scopeOfPublicId는 필수입력 정보입니다.';
  return await userDao.createEducation(userId, educationData);
};

const updateEducation = async (userId, educationId, educationData) => {
  const { college, degreeId, major, scopeOfPublicId } = educationData;
  if (!college.length) throw 'college는 필수입력 정보 입니다.';
  if (college === undefined) '존재하지 않는 학교 정보 입니다.';
  if (degreeId === undefined) 'degreeId는 필수입력 정보 입니다.';
  if (!major.length) throw 'major은 필수입력 정보 입니다';
  if (scopeOfPublicId === undefined)
    throw 'scopeOfPublicId는 필수입력 정보 입니다.';
  return await userDao.updateEducation(userId, educationId, educationData);
};

const deleteEducation = async (userId, educationId) => {
  return await userDao.deleteEducation(userId, educationId);
};

const createWebsite = async (userId, websiteData) => {
  const { websiteUrl, websiteType } = websiteData;
  if (!websiteUrl.length) throw 'websiteUrl은 필수입력 정보 입니다.';
  if (!websiteType.length) throw 'websiteType은 필수입력 정보 입니다.';
  return await userDao.createWebsite(userId, websiteData);
};

const deleteWebsite = async (userId, websiteId) => {
  return await userDao.deleteWebsite(userId, websiteId);
};

const createInstantMessenger = async (userId, instantMessengerData) => {
  const { messengerId, messengerType } = instantMessengerData;
  if (!messengerId.length) throw 'messengerId는 필수입력 정보 입니다.';
  if (!messengerType.length) throw 'messengerType은 필수입력 정보 입니다.';
  return await userDao.createInstantMessenger(userId, instantMessengerData);
};

const deleteInstantMessenger = async (userId, instantMessengerId) => {
  return await userDao.deleteInstantMessenger(userId, instantMessengerId);
};

const getUserListBySearch = async (query) => {
  const userListBySearch = await userDao.getUserListBySearch(query);
  return userListBySearch;
};

const getAllUserListByClick = async (query, limit, offset) => {
  const userAllList = await userDao.getAllUserListByClick(query, limit, offset);
  return userAllList;
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
  getCollegeSelect,
  createEducation,
  updateEducation,
  deleteEducation,
  createWebsite,
  deleteWebsite,
  createInstantMessenger,
  deleteInstantMessenger,
  getUserListBySearch,
  getAllUserListByClick,
};
