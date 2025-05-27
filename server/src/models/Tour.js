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
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    maxTourists: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TOUR_STATUSES)),
      allowNull: false,
      defaultValue: TOUR_STATUSES.DRAFT,
    },
    price_per_person: {
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
    foreignKey: 'employee_id',
  });
  Tour.hasMany(models.RoutePoint, {
    foreignKey: 'tour_id',
  });
  Tour.hasMany(models.TourBooking, {
    foreignKey: 'tour_id',
  });
  Tour.hasMany(models.TourService, {
    foreignKey: 'tour_id',
  });
};

export default Tour;
