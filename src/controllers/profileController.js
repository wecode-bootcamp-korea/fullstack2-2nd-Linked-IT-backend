import { profileService } from '../services';

const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const getProfile = await profileService.getProfile(userId);
    res.status(200).json(getProfile);
  } catch (err) {
    console.error(err);
  }
};

const getEducation = async (req, res) => {
  try {
    const userId = req.params.id;
    const getEducation = await profileService.getEducation(userId);
    res.status(200).json(getEducation);
  } catch (err) {
    console.error(err);
  }
};

const getCareer = async (req, res) => {
  try {
    const userId = req.params.id;
    const getCareer = await profileService.getCareer(userId);
    res.status(200).json(getCareer);
  } catch (err) {
    console.error(err);
  }
};

export default { getProfile, getEducation, getCareer };
