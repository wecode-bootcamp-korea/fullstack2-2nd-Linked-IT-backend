import { employmentDao } from '../models';

const getJobPostingList = async (filterWord) => {
  const jobPostingList = await employmentDao.getJobPostingList(filterWord);
  return jobPostingList;
};

const getJobPostingDetail = async () => {
  const jobPostingDetail = await employmentDao.getJobPostingDetail();
  return jobPostingDetail;
};

export default {
  getJobPostingList,
  getJobPostingDetail,
};
