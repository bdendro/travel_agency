import User from '../models/User.js';
import { DB_ERRORS } from '../constants/dbErrors.js';
import { ConflictError, NotFoundError } from '../utils/HttpErrors.js';
import { comparePasswords, getHashedPassword } from '../utils/hashedPassword.js';
import { UnauthorizedError } from '../utils/HttpErrors.js';

class UserService {
  constructor() {
    this.UserModel = User;
  }

  async findUserByUsername(username) {
    const user = await this.UserModel.findOne({ where: { username } });
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async verifyUser({ username, password }) {
    const user = await this.findUserByUsername(username);
    if (!(await comparePasswords(password, user?.password)))
      throw new UnauthorizedError('User not found or password is incorrect');
    return user;
  }

  async createUser(user, transaction) {
    const newUser = { ...user, password: await getHashedPassword(user.password) };
    try {
      return await this.UserModel.create(newUser, { transaction });
    } catch (error) {
      if (error instanceof DB_ERRORS.UNIQUE_CONSTRAINT)
        throw new ConflictError('User with that username already exists');
      throw error;
    }
  }

  async delete(id) {
    const affectedRowsCount = await this.UserModel.destroy({ where: { id } }); // ON DELETE: SET NULL to employee userId
    if (!affectedRowsCount) throw new NotFoundError('User not found');
  }
}

export default new UserService();
