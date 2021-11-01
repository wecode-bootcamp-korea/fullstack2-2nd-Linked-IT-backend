import { friendCardService } from '../services';

const getMayKnowFriends = async (req, res) => {
  try {
    const userId = req.params.id;
    const getMayKnowFriends = await friendCardService.getMayKnowFriends(userId);
    res.status(200).json(getMayKnowFriends);
  } catch (err) {
    console.error(err);
  }
};

export default { getMayKnowFriends };
