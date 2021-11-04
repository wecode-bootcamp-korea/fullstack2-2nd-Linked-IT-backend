import { employmentService } from '../services';

const getJobListBySearch = async (req, res) => {
  try {
    const query = req.query;
    const jobPostingBySearch = await employmentService.getJobListBySearch(
      query
    );
    res.status(200).send(jobPostingBySearch);
  } catch (err) {
    console.log(err);
  }
};

const getJobPostingList = async (req, res) => {
  try {
    const filterWord = req.query;
    const jobPostingList = await employmentService.getJobPostingList(
      filterWord
    );
    res.status(200).send(jobPostingList);
  } catch (err) {
    console.log(err);
  }
};

const getJobPostingDetail = async (req, res) => {
  try {
    const jobPostingId = req.params.id;
    const jobPostingDetail = await employmentService.getJobPostingDetail(
      jobPostingId
    );
    res.status(200).send(jobPostingDetail);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getJobListBySearch,
  getJobPostingList,
  getJobPostingDetail,
};
