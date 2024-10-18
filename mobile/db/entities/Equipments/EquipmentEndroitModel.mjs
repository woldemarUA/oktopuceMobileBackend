import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';

export class EquipmentEndroitModel extends Model {
  static async is_location() {
    const res = await this.findAll({
      attributes: ['id'],
      where: { is_location: true },
    });

    const records = res.map((r) => r.dataValues.id);

    return records;
  }

  static async getEndroitOptions() {
    const queryOptions = {
      attributes: [
        ['id', 'value'],
        ['name', 'label'],
        'produit_id',
        'is_location',
      ],
    };
    const response = await this.findAll(queryOptions);
    return response.map((res) => res.dataValues);
  }
}

EquipmentEndroitModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    produit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'equipment_produit',
        key: 'id',
      },
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    is_location: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
    modelName: 'EquipmentEndroitModel',
    tableName: 'equipment_endroit',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
