import { friendDao } from '../models';

const getFriend = async (userId) => {
  return await friendDao.getFriend(userId);
};

const getMyFriendList = async (userId) => {
  return await friendDao.getMyFriendList(userId);
};

export default { getFriend, getMyFriendList };
