import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

class Contractor extends Model {}

Contractor.init(
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
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contact_phone: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'contractors',
    schema: 'public',
    timestamps: false,
  }
);

Contractor.associate = (models) => {
  Contractor.belongsTo(models.ContractorType, {
    foreignKey: 'type_id',
  });
  Contractor.hasMany(models.TourService, {
    foreignKey: 'contractor_id',
  });
};

export default Contractor;
