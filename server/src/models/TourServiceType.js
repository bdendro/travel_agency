import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

class TourServiceType extends Model {}

TourServiceType.init(
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
    tableName: 'tour_service_types',
    schema: 'public',
    timestamps: false,
  }
);

TourServiceType.associate = (models) => {
  TourServiceType.hasMany(models.TourService, {
    foreignKey: 'typeId',
    as: 'tourServices',
  });
};

export default TourServiceType;
