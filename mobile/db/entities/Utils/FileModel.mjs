import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';

export class FilesModel extends Model {}

FilesModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    filepath: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    intervention_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'files',
    modelName: 'FilesModel',
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
        name: 'fk_intervention_id_files',
        using: 'BTREE',
        fields: [{ name: 'intervention_id' }],
      },
    ],
  }
);
