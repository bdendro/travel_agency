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
    contact_phone: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    user_id: {
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
  }
);

TourOperator.associate = (models) => {
  TourOperator.hasMany(models.TourBooking, {
    foreignKey: 'tour_operator_id',
  });
  TourOperator.belongsTo(models.User, {
    foreignKey: 'user_id',
  });
};

export default TourOperator;
