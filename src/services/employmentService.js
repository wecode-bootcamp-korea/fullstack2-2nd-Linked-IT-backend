import { employmentDao } from '../models';

const getJobPostingList = async () => {
  const jobPostingList = await employmentDao.getJobPostingList();
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
