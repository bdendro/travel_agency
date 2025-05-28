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
    positionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employedSince: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.literal('CURRENT_DATE'),
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'employees',
    schema: 'public',
    timestamps: false,
    underscored: true,
  }
);

Employee.associate = (models) => {
  Employee.belongsTo(models.EmployeePositionType, {
    foreignKey: 'positionId',
    as: 'position',
  });
  Employee.hasMany(models.Tour, {
    foreignKey: 'employeeId',
    as: 'tours',
  });
  Employee.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'SET NULL',
  });
};

export default Employee;
