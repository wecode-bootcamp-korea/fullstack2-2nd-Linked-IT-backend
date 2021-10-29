import { profileDao } from '../models';

const getProfile = async (id) => {
  return await profileDao.getProfile(id);
};

export default { getProfile };
