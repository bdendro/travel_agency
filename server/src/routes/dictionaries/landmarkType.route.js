import { Router } from 'express';
import DICTIONARY_ITEM_NAMES from '../../constants/dictionaryItemNames.js';
import LandmarkType from '../../models/LandmarkType.js';
import idValidator from '../../middleware/validateParamsId.js';
import DictionaryService from '../../services/dictionary.service.js';
import createDictionaryController from '../../controllers/dictionary.controller.js';
import validateSchema from '../../middleware/validateSchema.js';
import { dicionarySchema } from '../../middleware/schemas/dictionary.schema.js';

const landmarkTypeRouter = Router();

const landmarkTypeService = new DictionaryService(
  LandmarkType,
  DICTIONARY_ITEM_NAMES.LANDMARK_TYPE
);
const landmarkTypeController = createDictionaryController(landmarkTypeService);

landmarkTypeRouter.get('/', landmarkTypeController.getAll);

landmarkTypeRouter.get('/:itemId', idValidator(['itemId']), landmarkTypeController.get);

landmarkTypeRouter.post('/', validateSchema(dicionarySchema), landmarkTypeController.create);

landmarkTypeRouter.put(
  '/:itemId',
  idValidator(['itemId']),
  validateSchema(dicionarySchema),
  landmarkTypeController.update
);

landmarkTypeRouter.delete('/:itemId', idValidator(['itemId']), landmarkTypeController.deleteItem);

export default landmarkTypeRouter;
