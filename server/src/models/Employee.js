import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    position_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employed_since: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.literal('CURRENT_DATE'),
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'employees',
    schema: 'public',
    timestamps: false,
  }
);

Employee.associate = (models) => {
  Employee.belongsTo(models.EmployeePositionType, {
    foreignKey: 'position_id',
  });
  Employee.hasMany(models.Tour, {
    foreignKey: 'employee_id',
  });
  Employee.belongsTo(models.User, {
    foreignKey: 'user_id',
  });
};

export default Employee;
