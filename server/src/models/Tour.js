import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import TOUR_STATUSES from '../constants/enums/tourStatuses.js';

class Tour extends Model {}

Tour.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    maxTourists: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TOUR_STATUSES)),
      allowNull: false,
      defaultValue: TOUR_STATUSES.DRAFT,
    },
    pricePerPerson: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    sequelize,
    tableName: 'tours',
    schema: 'public',
    timestamps: false,
    underscored: true,
  }
);

Tour.associate = (models) => {
  Tour.belongsTo(models.Employee, {
    foreignKey: 'employeeId',
    as: 'employee',
  });
  Tour.hasMany(models.RoutePoint, {
    foreignKey: 'tourId',
    as: 'routePoints',
    onDelete: 'CASCADE',
  });
  Tour.hasMany(models.TourBooking, {
    foreignKey: 'tourId',
    as: 'tourBookings',
  });
  Tour.hasMany(models.TourService, {
    foreignKey: 'tourId',
    as: 'tourServices',
  });
};

export default Tour;
