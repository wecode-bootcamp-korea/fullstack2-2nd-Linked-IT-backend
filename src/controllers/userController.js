import { userService } from '../services';

const getUserListBySearch = async (req, res) => {
  try {
    const query = req.query;
    const userListBySearch = await userService.getUserListBySearch(query);
    res.status(200).send(userListBySearch);
  } catch (err) {
    console.log(err);
  }
};

const getAllUserListByClick = async (req, res) => {
  try {
    const query = req.query;
    const userAllList = await userService.getAllUserListByClick(query);
    res.status(200).send(userAllList);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getUserListBySearch,
  getAllUserListByClick,
};
