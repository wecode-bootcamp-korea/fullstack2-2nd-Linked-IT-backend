import { friendService } from '../services';

const getTotalFriendCount = async (req, res) => {
  try {
    const { userId } = req.params;
    const totalFriendCount = await friendService.getTotalFriendCount(userId);
    res.status(200).json(totalFriendCount);
  } catch (error) {
    console.log(error);
  }
};

const getFriendListByStatus = async (req, res) => {
  try {
    const { userId, friendStatusId } = req.query;
    const myFriendList = await friendService.getFriendListByStatus(
      userId,
      friendStatusId
    );
    res.status(200).json(myFriendList);
  } catch (error) {
    console.log(error);
  }
};

const getFriend = async (req, res) => {
  try {
    const { userId } = req.params;
    const totalFriendCount = await friendService.getTotalFriendCount(userId);
    res.status(200).json(totalFriendCount);
  } catch (error) {
    console.log(error);
  }
};

const addFriend = async (req, res) => {
  try {
    const friendId = await friendService.addFriend(req.body);
    res.status(201).json({ friendId });
  } catch (error) {
    console.log(error);
  }
};

const deleteFriend = async (req, res) => {
  try {
    const friendId = await friendService.deleteFriend(req.body);
    res.status(200).json({ friendId });
  } catch (error) {
    console.log(error);
  }
};

const updateFriend = async (req, res) => {
  try {
    const friendId = await friendService.updateFriend(req.body);
    res.status(200).json({ friendId });
  } catch (error) {
    console.log(error);
  }
};

export default {
  getTotalFriendCount,
  getFriendListByStatus,
  getFriend,
  addFriend,
  deleteFriend,
  updateFriend,
};
