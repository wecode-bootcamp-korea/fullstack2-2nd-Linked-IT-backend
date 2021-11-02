import { searchDao } from '../models';

const getSearchCompanyList = async (query) => {
  const searchCompanyList = await searchDao.getSearchCompanyList(query);
  return searchCompanyList;
};

const getSearchUserList = async (query) => {
  const searchUserList = await searchDao.getSearchUserList(query);
  return searchUserList;
};

const getSearchAllList = async (query) => {
  const searchAllList = await searchDao.getSearchAllList(query);
  return searchAllList;
};

export default {
  getSearchCompanyList,
  getSearchUserList,
  getSearchAllList,
};
