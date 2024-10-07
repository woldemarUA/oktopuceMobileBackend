import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';

export class EquipmentLocationsModel extends Model {
  static async getLocations() {
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

EquipmentLocationsModel.init(
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
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
    tableName: 'equipment_locations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
