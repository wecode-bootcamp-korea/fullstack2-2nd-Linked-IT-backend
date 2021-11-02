import { searchDao } from '../models';

const getSearchCompanyList = async (query) => {
  const searchCompanyList = await searchDao.getSearchCompanyList(query);
  return searchCompanyList;
};

const getSearchUserList = async (query) => {
  const searchUserList = await searchDao.getSearchUserList(query);
  return searchUserList;
};

export default {
  getSearchCompanyList,
  getSearchUserList,
};
