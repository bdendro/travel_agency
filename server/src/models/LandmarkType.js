import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

class LandmarkType extends Model {}

LandmarkType.init(
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
    tableName: 'landmark_types',
    schema: 'public',
    timestamps: false,
  }
);

LandmarkType.associate = (models) => {
  LandmarkType.hasMany(models.Landmark, {
    foreignKey: 'typeId',
  });
};

export default LandmarkType;
