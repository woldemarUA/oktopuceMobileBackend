import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';

export class EquipmentTypesModel extends Model {
  static async getEndroitIdsAll() {
    const res = await this.findAll({
      attributes: ['endroit_id'],
    });
    return new Set(res.map((r) => r.endroit_id));
  }

  static async isOption(is_option) {
    const res = await this.findAll({
      attributes: ['id'],
      where: { [is_option]: true },
    });

    const records = res.map((r) => r.dataValues.id);

    return records;
  }

  static async getEquipmentTypes() {
    const queryOptions = {
      attributes: [
        ['id', 'value'],
        'endroit_id',
        ['name', 'label'],
        'is_finalite',
        'is_gas',
        'is_int',
        'is_ext',
      ],
    };

    const response = await this.findAll(queryOptions);
    return response.map((res) => res.dataValues);
  }
}

EquipmentTypesModel.init(
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
    is_finalite: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_gas: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_int: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_ext: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },

    endroit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'equipment_endroit',
        key: 'id',
      },
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
    modelName: 'EquipmentTypesModel',
    tableName: 'equipment_types',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
