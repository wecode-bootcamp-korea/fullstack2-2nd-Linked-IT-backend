import { userService } from '../services';

const getUser = async (req, res) => {
  try {
    const userId = req.params.userid;
    const getUser = await userService.getUser(userId);
    res.status(200).json(getUser);
  } catch (err) {
    res.status(404).send(err);
  }
};

const getUserListBySearch = async (req, res) => {
  try {
    const query = req.query;
    const userListBySearch = await userService.getUserListBySearch(query);
    res.status(200).send(userListBySearch);
  } catch (err) {
    console.log(err);
  }
};

const getEducation = async (req, res) => {
  try {
    const userId = req.params.userid;
    const getEducation = await userService.getEducation(userId);
    res.status(200).json(getEducation);
  } catch (err) {
    res.status(404).send(err);
  }
};

const getPositionCareer = async (req, res) => {
  try {
    const userId = req.params.userid;
    const getPositionCareer = await userService.getPositionCareer(userId);
    res.status(200).json(getPositionCareer);
  } catch (err) {
    res.status(404).send(err);
  }
};

const updateIntro = async (req, res) => {
  try {
    const userId = req.params.userid;
    const userData = req.body;
    await userService.updateIntro(userId, userData);
    res.status(200).json({ message: 'UPDATE SUCCESS' });
  } catch (err) {
    res.status(404).send(err);
  }
};

const updateContact = async (req, res) => {
  try {
    const userId = req.params.userid;
    const userData = req.body;
    await userService.updateContact(userId, userData);
    res.status(200).json({ message: 'UPDATE SUCCESS' });
  } catch (err) {
    res.status(404).send(err);
  }
};

const createPositionCareer = async (req, res) => {
  try {
    const userId = req.params.userid;
    const positionCareerData = req.body;
    await userService.createPositionCareer(userId, positionCareerData);
    res.status(200).json({ messege: 'CREATE SUCCESS' });
  } catch (err) {
    res.status(404).send(err);
  }
};

const updatePositionCareer = async (req, res) => {
  try {
    const userId = req.params.userid;
    const positionCareerId = req.params.careerid;
    const positionCareerData = req.body;
    await userService.updatePositionCareer(
      userId,
      positionCareerId,
      positionCareerData
    );
    res.status(200).json({ messege: 'UPDATE SUCCESS' });
  } catch (err) {
    res.status(404).send(err);
  }
};

const deletePositionCareer = async (req, res) => {
  try {
    const userId = req.params.userid;
    const positionCareerId = req.params.careerid;
    await userService.deletePositionCareer(userId, positionCareerId);
    res.status(200).json({ messege: 'DELETE SUCCESS' });
  } catch (err) {
    res.status(404).send(err);
  }
};

const getCollegeSelect = async (req, res) => {
  try {
    const college = req.body.college;
    const colleges = await userService.getCollegeSelect(college);
    res.status(200).json(colleges);
  } catch (err) {
    res.status(404).send(err);
  }
};

const createEducation = async (req, res) => {
  try {
    const userId = req.params.userid;
    const educationData = req.body;
    await userService.createEducation(userId, educationData);
    res.status(200).json({ messege: 'CREATE SUCCESS' });
  } catch (err) {
    res.status(404).send(err);
  }
};

const updateEducation = async (req, res) => {
  try {
    const userId = req.params.userid;
    const educationId = req.params.educationid;
    const educationData = req.body;
    await userService.updateEducation(userId, educationId, educationData);
    res.status(200).json({ message: 'UPDATE SUCCESS' });
  } catch (err) {
    res.status(404).send(err);
  }
};

const deleteEducation = async (req, res) => {
  try {
    const userId = req.params.userid;
    const educationId = req.params.educationid;
    await userService.deleteEducation(userId, educationId);
    res.status(200).json({ message: 'DELETE SUCCESS' });
  } catch (err) {
    res.status(404).send(err);
  }
};

const createWebsite = async (req, res) => {
  try {
    const userId = req.params.userid;
    const websiteData = req.body;
    await userService.createWebsite(userId, websiteData);
    res.status(200).json({ message: 'CREATE SUCCESS' });
  } catch (err) {
    res.status(404).send(err);
  }
};

const deleteWebsite = async (req, res) => {
  try {
    const userId = req.params.userid;
    const websiteId = req.params.websiteid;
    await userService.deleteWebsite(userId, websiteId);
    res.status(200).json({ message: 'DELETE SUCCESS' });
  } catch (err) {
    res.status(404).send(err);
  }
};

const createInstantMessenger = async (req, res) => {
  try {
    const userId = req.params.userid;
    const instantMessengerData = req.body;
    await userService.createInstantMessenger(userId, instantMessengerData);
    res.status(200).json({ message: 'CREATE SUCCESS' });
  } catch (err) {
    res.status(404).send(err);
  }
};

const deleteInstantMessenger = async (req, res) => {
  try {
    const userId = req.params.userid;
    const instantMessengerId = req.params.messengerid;
    await userService.deleteInstantMessenger(userId, instantMessengerId);
    res.status(200).json({ message: 'DELETE SUCCESS' });
  } catch (err) {
    res.status(404).send(err);
  }
};

const getAllUserListByClick = async (req, res) => {
  try {
    const query = req.query;
    const userAllList = await userService.getAllUserListByClick(query);
    res.status(200).send(userAllList);
  } catch (err) {
    console.error(err);
  }
};

export default {
  getUser,
  getEducation,
  getPositionCareer,
  updateIntro,
  updateContact,
  createPositionCareer,
  updatePositionCareer,
  deletePositionCareer,
  getCollegeSelect,
  createEducation,
  updateEducation,
  deleteEducation,
  createWebsite,
  deleteWebsite,
  createInstantMessenger,
  deleteInstantMessenger,
  getUserListBySearch,
  getAllUserListByClick,
};
