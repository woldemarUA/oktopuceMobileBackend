import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';

export class EquipmentBrandsModel extends Model {
  static async getBrands() {
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

EquipmentBrandsModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
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
    modelName: 'EquipmentBrandsModel',
    tableName: 'equipment_brands',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
