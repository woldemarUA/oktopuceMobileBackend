import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';

export class EquipmentGasTypesModel extends Model {
  static async getPotentiel() {
    const res = await this.findAll({
      attributes: ['id', ['global_warming_potential', 'potentiel']],
    });

    const records = res.map((r) => r.dataValues.id);
    const potentiel = res.reduce((acc, value) => {
      acc[value.dataValues.id] = parseInt(value.dataValues.potentiel, 10);
      return acc;
    }, {});

    return { potentiel, records };
  }

  static async getGasTypes() {
    const queryOptions = {
      attributes: [
        ['id', 'value'],
        ['name', 'label'],
        ['global_warming_potential', 'potentiel'],
      ],
    };

    const response = await this.findAll(queryOptions);
    return response.map((res) => res.dataValues);
  }
}

EquipmentGasTypesModel.init(
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
    global_warming_potential: {
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
    tableName: 'gas_types',
    modelName: 'EquipmentGasTypesModel',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
