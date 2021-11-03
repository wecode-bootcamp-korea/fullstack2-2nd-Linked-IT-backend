import { friendDao } from '../models';

const getTotalFriendCount = async (userId) => {
  return await friendDao.getTotalFriendCount(userId);
};

const getMyFriendList = async (userId) => {
  return await friendDao.getMyFriendList(userId);
};
const getFriend = async (userId) => {
  return await friendDao.getFriend(userId);
};

export default { getTotalFriendCount, getMyFriendList, getFriend };
