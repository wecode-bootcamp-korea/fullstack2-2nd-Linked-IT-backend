import { employmentDao } from '../models';

const getJobListBySearch = async (query) => {
  const jobPostingBySearch = await employmentDao.getJobListBySearch(query);
  return jobPostingBySearch;
};
const getJobPostingList = async (filterWord) => {
  const jobPostingList = await employmentDao.getJobPostingList(filterWord);
  return jobPostingList;
};

const getJobPostingDetail = async (jobPostingId) => {
  const jobPostingDetail = await employmentDao.getJobPostingDetail(
    jobPostingId
  );
  return jobPostingDetail;
};

export default {
  getJobListBySearch,
  getJobPostingList,
  getJobPostingDetail,
};
