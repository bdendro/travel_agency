import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import USER_ROLES from '../constants/enums/userRoles.js';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(USER_ROLES)),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

User.associate = (models) => {
  User.hasOne(models.Employee, {
    foreignKey: 'user_id',
  });
  User.hasOne(models.TourOperator, {
    foreignKey: 'user_id',
  });
};

export default User;
