import { employmentService } from '../services';

const getEmploymentAnnouncement = async (req, res) => {
  try {
    const employmentAnnouncementList =
      await employmentService.getEmploymentAnnouncement();
    res.status(200).send(employmentAnnouncementList);
  } catch (err) {
    console.log(err);
  }
};

const getCompanyProfile = async (req, res) => {
  try {
    const { jobId } = req.query;
    const companyProfileList = await employmentService.getCompanyProfile(jobId);
    res.status(200).send(companyProfileList);
  } catch (err) {
    console.log(err);
  }
};

const getUserByEmploymentAnnouncementId = async (req, res) => {
  try {
    // const { userId } = req.query;
    const userByCompanyPost =
      await employmentService.getUserByEmploymentAnnouncementId();
    res.status(200).send(userByCompanyPost);
  } catch (err) {
    console.log(err);
  }
};
export default {
  getEmploymentAnnouncement,
  getCompanyProfile,
  getUserByEmploymentAnnouncementId,
};
