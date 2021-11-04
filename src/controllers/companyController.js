import { companyService } from '../services';

const getCompanyListBySearch = async (req, res) => {
  try {
    const query = req.query;
    const companyListBySearch = await companyService.getCompanyListBySearch(
      query
    );
    res.status(200).send(companyListBySearch);
  } catch (err) {
    console.log(err);
  }
};

const getAllCompanyListByClick = async (req, res) => {
  try {
    const query = req.query;
    const { limit, offset } = req.query;
    const searchAllList = await companyService.getSearchAllList(
      query,
      limit,
      offset
    );
    res.status(200).send(searchAllList);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getCompanyListBySearch,
  getAllCompanyListByClick,
};
