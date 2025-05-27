import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import REFUND_STATUS from '../constants/enums/refundStatuses.js';

class TourCancellation extends Model {}

TourCancellation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    cancellationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now'),
    },
    reason: {
      type: DataTypes.TEXT,
    },
    refundAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    refundStatus: {
      type: DataTypes.ENUM(...Object.values(REFUND_STATUS)),
      allowNull: false,
      defaultValue: REFUND_STATUS.PENDING,
    },
  },
  {
    sequelize,
    tableName: 'tour_cancellations',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    underscored: true,
  }
);

TourCancellation.associate = (models) => {
  TourCancellation.belongsTo(models.TourBooking, {
    foreignKey: 'booking_id',
  });
};

export default TourCancellation;
