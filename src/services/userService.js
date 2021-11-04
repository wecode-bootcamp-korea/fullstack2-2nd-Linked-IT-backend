import { userDao } from '../models';

const getUser = async (userId) => {
  const DBdata = await userDao.getEducation(userId);
  if (!DBdata.length) {
    const err = new Error('존재하지 않는 유저정보 입니다.');
    err.statusCode = 404;
    throw err;
  }
  return await userDao.getUser(userId);
};

const getEducation = async (userId) => {
  const DBdata = await userDao.getEducation(userId);
  if (!DBdata.length) {
    const err = new Error('존재하지 않는 유저정보 입니다.');
    err.statusCode = 404;
    throw err;
  }
  return await userDao.getEducation(userId);
};

const getPositionCareer = async (userId) => {
  const DBdata = await userDao.getPositionCareer(userId);
  if (!DBdata.length) {
    const err = new Error('존재하지 않는 유저정보 입니다.');
    err.statusCode = 404;
    throw err;
  }
  return await userDao.getPositionCareer(userId);
};

const updateIntro = async (userId, userData) => {
  const DBdata = await userDao.getEducation(userId);
  if (!DBdata.length) {
    const err = new Error('존재하지 않는 유저정보 입니다.');
    err.statusCode = 404;
    throw err;
  }
  return await userDao.updateIntro(userId, userData);
};

const updateContact = async (userId, userData) => {
  const DBdata = await userDao.getEducation(userId);
  if (!DBdata.length) {
    const err = new Error('존재하지 않는 유저정보 입니다.');
    err.statusCode = 404;
    throw err;
  }
  return await userDao.updateContact(userId, userData);
};

const createPositionCareer = async (userId, positionCareerData) => {
  const DBdata = await userDao.getEducation(userId);
  if (!DBdata.length) {
    const err = new Error('존재하지 않는 유저정보 입니다.');
    err.statusCode = 404;
    throw err;
  }
  return await userDao.createPositionCareer(userId, positionCareerData);
};

const updatePositionCareer = async (
  userId,
  positionCareerId,
  positionCareerData
) => {
  const DBdata = await userDao.updatePositionCareer(positionCareerId);
  if (!DBdata.length) {
    const err = new Error('존재하지 않는 유저정보 입니다.');
    err.statusCode = 404;
    throw err;
  }
  return await userDao.updatePositionCareer(
    userId,
    positionCareerId,
    positionCareerData
  );
};

const deletePositionCareer = async (userId, positionCareerId) => {
  const DBdata = await userDao.deletePositionCareer(positionCareerId);
  if (!DBdata.length) {
    const err = new Error('존재하지 않는 유저정보 입니다.');
    err.statusCode = 404;
    throw err;
  }
  return await userDao.deletePositionCareer(userId, positionCareerId);
};

const createEducation = async (userId, educationData) => {
  return await userDao.createEducation(userId, educationData);
};

const updateEducation = async (userId, educationId, educationData) => {
  const DBdata = await userDao.updateEducation(educationId);
  if (!DBdata.length) {
    const err = new Error('존재하지 않는 유저정보 입니다.');
    err.statusCode = 404;
    throw err;
  }
  return await userDao.updateEducation(userId, educationId, educationData);
};

const deleteEducation = async (userId, educationId) => {
  const DBdata = await userDao.deleteEducation(educationId);
  if (!DBdata.length) {
    const err = new Error('존재하지 않는 유저정보 입니다.');
    err.statusCode = 404;
    throw err;
  }
  return await userDao.deleteEducation(userId, educationId);
};

const createWebsite = async (userId, websiteData) => {
  return await userDao.createWebsite(userId, websiteData);
};

const deleteWebsite = async (userId, websiteId) => {
  const DBdata = await userDao.deleteWebsite(websiteId);
  if (!DBdata.length) {
    const err = new Error('존재하지 않는 유저정보 입니다.');
    err.statusCode = 404;
    throw err;
  }
  return await userDao.deleteWebsite(userId, websiteId);
};

const createInstantMessenger = async (userId, instantMessengerData) => {
  return await userDao.createInstantMessenger(userId, instantMessengerData);
};

const deleteInstantMessenger = async (userId, instantMessengerId) => {
  const DBdata = await userDao.deleteInstantMessenger(instantMessengerId);
  if (!DBdata.length) {
    const err = new Error('존재하지 않는 유저정보 입니다.');
    err.statusCode = 404;
    throw err;
  }
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
