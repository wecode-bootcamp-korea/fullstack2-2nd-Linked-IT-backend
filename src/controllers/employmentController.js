import { employmentService } from '../services';

const getJobPostingList = async (req, res) => {
  try {
    const jobPostingList = await employmentService.getJobPostingList();
    res.status(200).send(jobPostingList);
  } catch (err) {
    console.log(err);
  }
};

const getJobPostingDetail = async (req, res) => {
  try {
    const jobPostingDetail = await employmentService.getJobPostingDetail();
    res.status(200).send(jobPostingDetail);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getJobPostingList,
  getJobPostingDetail,
};
