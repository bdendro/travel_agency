import EmployeeWithUserDTO, {
  EmployeeWithUserRawDTO,
} from '../dto/employee/EmployeeUser.output.dto.js';
import employeeService from '../services/employee.service.js';

export const registerEmployee = async (req, res, next) => {
  const employeeId = req.paramsValidated.employeeId;
  try {
    const { user, employee } = await employeeService.registerEmployee(
      req.bodyValidated,
      employeeId
    );
    return res
      .status(201)
      .json(new EmployeeWithUserRawDTO(employee, user, req.bodyValidated.password));
  } catch (err) {
    next(err);
  }
};

export const unregisterEmployee = async (req, res, next) => {
  const employeeId = req.paramsValidated.employeeId;
  try {
    const employee = await employeeService.unregisterEmployee(employeeId);
    return res.status(200).json(new EmployeeWithUserDTO(employee));
  } catch (err) {
    next(err);
  }
};
