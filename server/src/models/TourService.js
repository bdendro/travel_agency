import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import TOUR_SERVICE_STATUSES from '../constants/enums/tourServiceStatuses.js';

class TourService extends Model {}

TourService.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    contractor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tour_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TOUR_SERVICE_STATUSES)),
      allowNull: false,
      defaultValue: TOUR_SERVICE_STATUSES.PREPARING,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tour_services',
    schema: 'public',
    timestamps: false,
  }
);

TourService.associate = (models) => {
  TourService.belongsTo(models.Contractor, {
    foreignKey: 'contractor_id',
  });
  TourService.belongsTo(models.TourServiceType, {
    foreignKey: 'type_id',
  });
  TourService.belongsTo(models.Tour, {
    foreignKey: 'tour_id',
  });
};

export default TourService;
