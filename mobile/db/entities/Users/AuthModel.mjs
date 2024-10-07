import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';

import { UsersModel } from './UserModel.mjs';

export class AuthDetailsModel extends Model {}

AuthDetailsModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    hashed_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UsersModel,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'auth_details',
    modelName: 'AuthDetailsModel',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'id' }],
      },
      {
        name: 'unique_email',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'email' }],
      },
      {
        name: 'fk_user_id',
        using: 'BTREE',
        fields: [{ name: 'user_id' }],
      },
    ],
  }
);
