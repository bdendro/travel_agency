import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import TOUR_BOOKING_STATUSES from '../constants/enums/tourBookingStatuses.js';

class TourBooking extends Model {}

TourBooking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tourId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tourOperatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now'),
    },
    touristCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TOUR_BOOKING_STATUSES)),
      allowNull: false,
      defaultValue: 'pending',
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tour_bookings',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    underscored: true,
  }
);

TourBooking.associate = (models) => {
  TourBooking.hasOne(models.TourCancellation, {
    foreignKey: 'bookingId',
    as: 'tourCancellation',
  });
  TourBooking.belongsTo(models.TourOperator, {
    foreignKey: 'tourOperatorId',
    as: 'tourOperator',
  });
  TourBooking.belongsTo(models.Tour, {
    foreignKey: 'tourId',
    as: 'tour',
  });
};

export default TourBooking;
