import sequelize from '../db/connection.js';
import Employee from '../models/Employee.js';
import { DB_ERRORS } from '../constants/dbErrors.js';
import { ConflictError, NotFoundError, BadRequestError } from '../utils/HttpErrors.js';
import EmployeePositionType from '../models/EmployeePositionType.js';
import USER_ROLES from '../constants/enums/userRoles.js';
import userService from './user.service.js';

class EmployeeService {
  constructor() {
    this.Employee = Employee;
    this.EmployeePositionModel = EmployeePositionType;
    this.userService = userService;
  }

  async _getById(id) {
    const employee = await this.Employee.findByPk(id);
    if (!employee) throw new NotFoundError('Employee not found');
    return employee;
  }

  async getWithPosition(id) {
    const employee = await this.Employee.findByPk(id, {
      include: [{ model: this.EmployeePositionModel, as: 'position' }],
    });
    if (!employee) throw new NotFoundError('Employee not found');
    return employee;
  }

  async getByUser(user) {
    const employee = await user.getEmployee({
      include: [{ model: this.EmployeePositionModel, as: 'position' }],
    });
    if (!user) throw new NotFoundError('Employee not found');
    return employee;
  }

  async getByUserId(userId) {
    const employee = await this.Employee.findOne({ where: { userId } });
    if (!employee) throw new NotFoundError('Employee not found');
    return employee;
  }

  async registerEmployee(user, employeeId) {
    if (![USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE].includes(user.role)) {
      throw new BadRequestError(`'${user.role}' isn't employee role`);
    }
    const t = await sequelize.transaction();

    try {
      const employee = await this.Employee.findByPk(employeeId, {
        transaction: t,
        lock: t?.LOCK.UPDATE,
      });

      if (!employee) throw new NotFoundError('Employee not found');
      if (employee.userId) throw new ConflictError('Employee already has access');

      const userRes = await this.userService.createUser(user, t);
      const newEmployee = await this.setEmployeeUserId(employeeId, userRes.id, t);
      await t.commit();
      return { user: userRes, employee: newEmployee };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async unregisterEmployee(employeeId) {
    const employee = await this.Employee.findByPk(employeeId);

    if (!employee) throw new NotFoundError('Employee not found');
    if (!employee.userId) throw new ConflictError("Employee already don't have access");

    await this.userService.delete(employee.userId); // ON DELETE: SET NULL to employee userId
    return await this.getWithPosition(employeeId);
  }

  async setEmployeeUserId(id, userId, transaction) {
    try {
      await this.Employee.update({ userId }, { where: { id }, transaction });

      return await this.getWithPosition(id);
    } catch (error) {
      if (error instanceof DB_ERRORS.UNIQUE_CONSTRAINT)
        throw new ConflictError('User with that id already in use');
      throw error;
    }
  }
}

export default new EmployeeService();
