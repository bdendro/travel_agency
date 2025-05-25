import { Router } from 'express';
import DictionaryService from '../../services/dictionary.service.js';
import ContractorType from '../../models/ContractorType.js';
import idValidator from '../../middleware/validateParamsId.js';
import validateSchema from '../../middleware/validateSchema.js';
import { dicionarySchema } from '../../middleware/schemas/dictionary.schema.js';
import createDictionaryController from '../../controllers/dictionary.controller.js';
import DICTIONARY_ITEM_NAMES from '../../constants/dictionaryItemNames.js';

const contractorTypeRouter = Router();

const contractorTypeService = new DictionaryService(
  ContractorType,
  DICTIONARY_ITEM_NAMES.CONTRACTOR_TYPE
);
const contractorTypeController = createDictionaryController(contractorTypeService);

contractorTypeRouter.get('/', contractorTypeController.getAll);

contractorTypeRouter.get('/:itemId', idValidator(['itemId']), contractorTypeController.get);

contractorTypeRouter.post('/', validateSchema(dicionarySchema), contractorTypeController.create);

contractorTypeRouter.put(
  '/:itemId',
  idValidator(['itemId']),
  validateSchema(dicionarySchema),
  contractorTypeController.update
);

contractorTypeRouter.delete(
  '/:itemId',
  idValidator(['itemId']),
  contractorTypeController.deleteItem
);

export default contractorTypeRouter;
