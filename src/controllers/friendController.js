import { friendService } from '../services';

const getFriend = async (req, res) => {
  try {
    const userId = req.params.userid;
    const getFriend = await friendService.getFriend(userId);
    res.status(200).json(getFriend);
  } catch (err) {
    console.error(err);
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

export default { getFriend, getMyFriendList };
