import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';

export class ClientTypes extends Model {}

ClientTypes.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED, // Reflecting BIGINT UNSIGNED
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255), // Reflecting VARCHAR(255)
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE, // Reflecting TIMESTAMP
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE, // Reflecting TIMESTAMP
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'ClientTypes',
    tableName: 'client_types',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
