import { profileService } from '../services';

const getProfile = async () => {
  return await profileService.getProfile();
};

export default { getProfile };
