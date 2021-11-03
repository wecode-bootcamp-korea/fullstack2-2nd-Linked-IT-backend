import { profileDao } from '../models';

const getProfile = async (userId) => {
  return await profileDao.getProfile(userId);
};

const getEducation = async (userId) => {
  return await profileDao.getEducation(userId);
};

const getCareer = async (userId) => {
  return await profileDao.getCareer(userId);
};

export default { getProfile, getEducation, getCareer };
