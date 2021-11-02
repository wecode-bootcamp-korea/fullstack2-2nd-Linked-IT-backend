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

export default { getFriend };
