import { Router } from 'express';
import DICTIONARY_ITEM_NAMES from '../../constants/dictionaryItemNames.js';
import TourServiceType from '../../models/TourServiceType.js';
import idValidator from '../../middleware/validateParamsId.js';
import DictionaryService from '../../services/dictionary.service.js';
import createDictionaryController from '../../controllers/dictionary.controller.js';
import validateSchema from '../../middleware/validateSchema.js';
import { dicionarySchema } from '../../middleware/schemas/dictionary.schema.js';

const tourServiceTypeRouter = Router();

const tourServiceTypeService = new DictionaryService(
  TourServiceType,
  DICTIONARY_ITEM_NAMES.TOUR_SERVICE_TYPE
);
const tourServiceTypeController = createDictionaryController(tourServiceTypeService);

tourServiceTypeRouter.get('/', tourServiceTypeController.getAll);

tourServiceTypeRouter.get('/:itemId', idValidator(['itemId']), tourServiceTypeController.get);

tourServiceTypeRouter.post('/', validateSchema(dicionarySchema), tourServiceTypeController.create);

tourServiceTypeRouter.put(
  '/:itemId',
  idValidator(['itemId']),
  validateSchema(dicionarySchema),
  tourServiceTypeController.update
);

tourServiceTypeRouter.delete(
  '/:itemId',
  idValidator(['itemId']),
  tourServiceTypeController.deleteItem
);

export default tourServiceTypeRouter;
