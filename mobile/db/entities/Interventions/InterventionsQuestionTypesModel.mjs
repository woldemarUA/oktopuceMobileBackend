import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';

export class InterventionsQuestionTypesModel extends Model {}

InterventionsQuestionTypesModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'intervention_question_types',
    modelName: 'InterventionsQuestionTypesModel',
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
    ],
  }
);
