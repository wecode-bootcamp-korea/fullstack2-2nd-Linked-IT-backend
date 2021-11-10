import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

router.get('/college', userController.getCollegeSelect);
router.get('/:userid', userController.getUser);
router.get('/:userid/education', userController.getEducation);
router.get('/:userid/career', userController.getPositionCareer);
router.patch('/:userid/intro', userController.updateIntro);
router.patch('/:userid/contact', userController.updateContact);
router.post('/:userid/career', userController.createPositionCareer);
router.patch('/:userid/career/:careerid', userController.updatePositionCareer);
router.delete('/:userid/career/:careerid', userController.deletePositionCareer);
router.post('/:userid/education', userController.createEducation);
router.patch('/:userid/education/:educationid', userController.updateEducation);
router.delete(
  '/:userid/education/:educationid',
  userController.deleteEducation
);
router.post('/:userid/website', userController.createWebsite);
router.delete('/:userid/website/:websiteid', userController.deleteWebsite);
router.post('/:userid/messenger', userController.createInstantMessenger);
router.delete(
  '/:userid/messenger/:messengerid',
  userController.deleteInstantMessenger
);

router.get('/', userController.getUserListBySearch);

export default router;
