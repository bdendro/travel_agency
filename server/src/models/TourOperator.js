import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import TOUR_OPERATOR_TYPES from '../constants/enums/tourOperatorTypes.js';

class TourOperator extends Model {}

TourOperator.init(
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
    type: {
      type: DataTypes.ENUM(...Object.values(TOUR_OPERATOR_TYPES)),
      allowNull: false,
    },
    contactPhone: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'tour_operators',
    schema: 'public',
    timestamps: false,
    underscored: true,
  }
);

TourOperator.associate = (models) => {
  TourOperator.hasMany(models.TourBooking, {
    foreignKey: 'tourOperatorId',
    as: 'tourBookings',
  });
  TourOperator.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'SET NULL',
  });
};

export default TourOperator;
