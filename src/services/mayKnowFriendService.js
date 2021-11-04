import { mayKnowFriendDao } from '../models';

const getMayKnowFriends = async (userId) => {
  return await mayKnowFriendDao.getMayKnowFriends(userId);
};

export default { getMayKnowFriends };
