import contractorService from '../services/contractor.service.js';

export const deleteContractor = async (req, res, next) => {
  const contractorId = req.paramsValidated.contractorId;
  try {
    await contractorService.delete(contractorId);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
