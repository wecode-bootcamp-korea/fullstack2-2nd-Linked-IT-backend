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

const getMyFriendList = async (req, res) => {
  try {
    const { userId } = req.query;
    const myFriendList = await friendService.getMyFriendList(userId);
    res.status(200).json(myFriendList);
  } catch (error) {
    console.log(error);
  }
};

const getFriend = async (req, res) => {
  try {
    const userId = req.params.userid;
    const getFriend = await friendService.getFriend(userId);
    res.status(200).json(getFriend);
  } catch (err) {
    console.error(err);
  }
};

export default { getTotalFriendCount, getMyFriendList, getFriend };
