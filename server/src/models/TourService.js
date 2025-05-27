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
    contractorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tourId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isMandatory: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 'true',
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TOUR_SERVICE_STATUSES)),
      allowNull: false,
      defaultValue: TOUR_SERVICE_STATUSES.PREPARING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: 'tour_services',
    schema: 'public',
    timestamps: false,
    underscored: true,
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
