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
    landmark_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tour_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sequence_order: {
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
  }
);

RoutePoint.associate = (models) => {
  RoutePoint.belongsTo(models.Landmark, {
    foreignKey: 'landmark_id',
  });
  RoutePoint.belongsTo(models.Tour, {
    foreignKey: 'tour_id',
  });
};

export default RoutePoint;
