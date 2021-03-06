import { friendDao } from '../models';

const getTotalFriendCount = async (userId) => {
  return await friendDao.getTotalFriendCount(userId);
};

const getFriendListByStatus = async (userId, friendStatusId) => {
  return await friendDao.getFriendListByStatus(userId, friendStatusId);
};

const addFriend = async (userInfo) => {
  return await friendDao.addFriend(userInfo);
};

const deleteFriend = async (userInfo) => {
  return await friendDao.deleteFriend(userInfo);
};

const updateFriend = async (userInfo) => {
  return await friendDao.updateFriend(userInfo);
};

export default {
  getTotalFriendCount,
  getFriendListByStatus,
  addFriend,
  deleteFriend,
  updateFriend,
};
