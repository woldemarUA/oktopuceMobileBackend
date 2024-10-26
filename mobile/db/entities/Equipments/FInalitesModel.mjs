import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';

export class FinalitesModel extends Model {}

FinalitesModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'finalites',
    modelName: 'FinalitesModel',
    timestamps: false,
  }
);
