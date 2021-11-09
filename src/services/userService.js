import { userDao } from '../models';

const getUser = async (userId) => {
  return await userDao.getUser(userId);
};

const getEducation = async (userId) => {
  return await userDao.getEducation(userId);
};

const getPositionCareer = async (userId) => {
  return await userDao.getPositionCareer(userId);
};

const updateIntro = async (userId, userData) => {
  return await userDao.updateIntro(userId, userData);
};

const updateContact = async (userId, userData) => {
  return await userDao.updateContact(userId, userData);
};

const createPositionCareer = async (userId, positionCareerData) => {
  return await userDao.createPositionCareer(userId, positionCareerData);
};

const updatePositionCareer = async (
  userId,
  positionCareerId,
  positionCareerData
) => {
  return await userDao.updatePositionCareer(
    userId,
    positionCareerId,
    positionCareerData
  );
};

const deletePositionCareer = async (userId, positionCareerId) => {
  return await userDao.deletePositionCareer(userId, positionCareerId);
};

const getCollegeSelect = async () => {
  return await userDao.getCollegeSelect();
};

const createEducation = async (userId, educationData) => {
  return await userDao.createEducation(userId, educationData);
};

const updateEducation = async (userId, educationId, educationData) => {
  return await userDao.updateEducation(userId, educationId, educationData);
};

const deleteEducation = async (userId, educationId) => {
  return await userDao.deleteEducation(userId, educationId);
};

const createWebsite = async (userId, websiteData) => {
  return await userDao.createWebsite(userId, websiteData);
};

const deleteWebsite = async (userId, websiteId) => {
  return await userDao.deleteWebsite(userId, websiteId);
};

const createInstantMessenger = async (userId, instantMessengerData) => {
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
  createEducation,
  updateEducation,
  deleteEducation,
  createWebsite,
  deleteWebsite,
  createInstantMessenger,
  deleteInstantMessenger,
  getUserListBySearch,
  getAllUserListByClick,
  getCollegeSelect,
};
