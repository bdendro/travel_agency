import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

class EmployeePositionType extends Model {}

EmployeePositionType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'employee_position_types',
    schema: 'public',
    timestamps: false,
  }
);

EmployeePositionType.associate = (models) => {
  EmployeePositionType.hasMany(models.Employee, {
    foreignKey: 'position_id',
    as: 'employee',
  });
};

export default EmployeePositionType;
