import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';

export class EquipmentIntTypesModel extends Model {
  static async getInteriorTypes() {
    const queryOptions = {
      attributes: [
        ['id', 'value'],
        ['name', 'label'],
      ],
    };

    const response = await this.findAll(queryOptions);

    return response.map((res) => res.dataValues);
  }
}

EquipmentIntTypesModel.init(
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
    modelName: 'EquipmentIntTypesModels',
    tableName: 'equipment_int_types',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
