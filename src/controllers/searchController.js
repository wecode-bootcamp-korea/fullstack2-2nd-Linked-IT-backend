import { searchService } from '../services';

const getSearchResult = async (req, res) => {
  try {
    const query = req.query;
    const { limit, offset } = req.query;
    const searchAllList = await searchService.getSearchResult(
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
  getSearchResult,
};
