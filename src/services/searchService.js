import { searchDao } from '../models';

const getSearchResult = async (query, limit) => {
  const searchAllList = await searchDao.getSearchResult(query, limit);
  return searchAllList;
};

export default {
  getSearchResult,
};
