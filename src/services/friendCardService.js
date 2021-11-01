import { friendCardDao } from '../models';

const getMayKnowFriends = async (userId) => {
  return await friendCardDao.getMayKnowFriends(userId);
};

export default { getMayKnowFriends };
