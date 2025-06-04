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
    durationInSeconds: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'route_points',
    schema: 'public',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['tourId', 'sequenceOrder'],
        name: 'route_points_order_key',
      },
    ],
  }
);

RoutePoint.associate = (models) => {
  RoutePoint.belongsTo(models.Landmark, {
    foreignKey: 'landmarkId',
    as: 'landmark',
  });
  RoutePoint.belongsTo(models.Tour, {
    foreignKey: 'tourId',
    as: 'tour',
    onDelete: 'CASCADE',
  });
};

export default RoutePoint;
