import { userDao } from '../models';

const getUserListBySearch = async (query) => {
  const userListBySearch = await userDao.getUserListBySearch(query);
  return userListBySearch;
};

const getAllUserListByClick = async (query, limit, offset) => {
  const userAllList = await userDao.getAllUserListByClick(query, limit, offset);
  return userAllList;
};

export default {
  getUserListBySearch,
  getAllUserListByClick,
};
