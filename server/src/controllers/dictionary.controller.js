import DictionaryDTO from '../dto/dictionary/Dictionary.dto.js';

const createDictionaryController = (dictionaryService) => {
  const getAll = async (req, res, next) => {
    try {
      const items = await dictionaryService.getAll();
      const itemsRes = items.map((item) => new DictionaryDTO(item));
      return res.status(200).json(itemsRes);
    } catch (err) {
      next(err);
    }
  };

  const get = async (req, res, next) => {
    const itemId = req.paramsValidated.itemId;
    try {
      const item = await dictionaryService.get(itemId);
      return res.status(200).json(new DictionaryDTO(item));
    } catch (err) {
      next(err);
    }
  };

  const create = async (req, res, next) => {
    const itemReq = req.bodyValidated;
    try {
      const item = await dictionaryService.create(itemReq);
      return res.status(201).json(new DictionaryDTO(item));
    } catch (err) {
      next(err);
    }
  };

  const update = async (req, res, next) => {
    const itemId = req.paramsValidated.itemId;
    const itemReq = req.bodyValidated;
    try {
      const item = await dictionaryService.update(itemId, itemReq);
      return res.status(201).json(new DictionaryDTO(item));
    } catch (err) {
      next(err);
    }
  };

  const deleteItem = async (req, res, next) => {
    const itemId = req.paramsValidated.itemId;
    try {
      await dictionaryService.delete(itemId);
      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };

  return { getAll, get, create, update, deleteItem };
};

export default createDictionaryController;
