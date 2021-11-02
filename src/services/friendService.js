import { friendDao } from '../models';

const getFriend = async (userId) => {
  return await friendDao.getFriend(userId);
};

export default { getFriend };
