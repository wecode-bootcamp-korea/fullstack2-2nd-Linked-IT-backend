import { searchService } from '../services';

const getSearchCompanyList = async (req, res) => {
  try {
    const query = req.query;
    const searchResultList = await searchService.getSearchCompanyList(query);
    res.status(200).send(searchResultList);
  } catch (err) {
    console.log(err);
  }
};

const getSearchUserList = async (req, res) => {
  try {
    const query = req.query;
    const searchUserList = await searchService.getSearchUserList(query);
    res.status(200).send(searchUserList);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getSearchCompanyList,
  getSearchUserList,
};
