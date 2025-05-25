import { Router } from 'express';
import DICTIONARY_ITEM_NAMES from '../../constants/dictionaryItemNames.js';
import EmployeePositionType from '../../models/EmployeePositionType.js';
import idValidator from '../../middleware/validateParamsId.js';
import DictionaryService from '../../services/dictionary.service.js';
import createDictionaryController from '../../controllers/dictionary.controller.js';
import validateSchema from '../../middleware/validateSchema.js';
import { dicionarySchema } from '../../middleware/schemas/dictionary.schema.js';

const employeePositionRouter = Router();

const employeePositionService = new DictionaryService(
  EmployeePositionType,
  DICTIONARY_ITEM_NAMES.EMPLOYEE_POSITION
);
const employeePositionController = createDictionaryController(employeePositionService);

employeePositionRouter.get('/', employeePositionController.getAll);

employeePositionRouter.get('/:itemId', idValidator(['itemId']), employeePositionController.get);

employeePositionRouter.post(
  '/',
  validateSchema(dicionarySchema),
  employeePositionController.create
);

employeePositionRouter.put(
  '/:itemId',
  idValidator(['itemId']),
  validateSchema(dicionarySchema),
  employeePositionController.update
);

employeePositionRouter.delete(
  '/:itemId',
  idValidator(['itemId']),
  employeePositionController.deleteItem
);

export default employeePositionRouter;
