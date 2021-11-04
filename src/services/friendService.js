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

const addFriend = async (userInfo) => {
  return await friendDao.addFriend(userInfo);
};

const deleteFriend = async (userInfo) => {
  return await friendDao.deleteFriend(userInfo);
};

export default {
  getTotalFriendCount,
  getMyFriendList,
  getFriend,
  addFriend,
  deleteFriend,
};
