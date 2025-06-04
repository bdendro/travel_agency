import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

class ContractorType extends Model {}

ContractorType.init(
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
    tableName: 'contractor_types',
    schema: 'public',
    timestamps: false,
  }
);

ContractorType.associate = (models) => {
  ContractorType.hasMany(models.Contractor, {
    foreignKey: 'typeId',
    as: 'contractors',
  });
};

export default ContractorType;
