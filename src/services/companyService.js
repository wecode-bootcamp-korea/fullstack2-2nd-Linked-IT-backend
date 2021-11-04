import { companyDao } from '../models';

const getCompanyListBySearch = async (query) => {
  const companyListBySearch = await companyDao.getCompanyListBySearch(query);
  return companyListBySearch;
};

const getAllCompanyListByClick = async (query, limit, offset) => {
  const allCompany = await companyDao.getAllCompanyListByClick(
    query,
    limit,
    offset
  );
  return allCompany;
};

export default {
  getCompanyListBySearch,
  getAllCompanyListByClick,
};
