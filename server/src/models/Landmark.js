import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

class Landmark extends Model {}

Landmark.init(
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
    description: {
      type: DataTypes.TEXT,
    },
    geographicLocation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'landmarks',
    schema: 'public',
    timestamps: false,
    underscored: true,
  }
);

Landmark.associate = (models) => {
  Landmark.belongsTo(models.LandmarkType, {
    foreignKey: 'typeId',
  });
  Landmark.hasMany(models.RoutePoint, {
    foreignKey: 'landmarkId',
  });
};

export default Landmark;
