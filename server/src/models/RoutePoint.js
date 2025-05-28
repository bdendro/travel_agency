import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

class RoutePoint extends Model {}

RoutePoint.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    landmarkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tourId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sequenceOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'route_points',
    schema: 'public',
    timestamps: false,
    underscored: true,
  }
);

RoutePoint.associate = (models) => {
  RoutePoint.belongsTo(models.Landmark, {
    foreignKey: 'landmarkId',
  });
  RoutePoint.belongsTo(models.Tour, {
    foreignKey: 'tourId',
  });
};

export default RoutePoint;
