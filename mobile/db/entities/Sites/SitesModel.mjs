import { DataTypes, Model, where } from 'sequelize';
import sequelize from '../../db_connector.mjs';

export class SitesModel extends Model {
  static async getSitesOptions(client_id = null) {
    const queryOptions = {
      attributes: [
        ['id', 'value'],
        ['name', 'label'],
      ],
    };

    if (client_id) {
      queryOptions.where = { client_id };
    }
    const response = await this.findAll(queryOptions);

    return response.map((res) => ({ ...res.dataValues, link: this.tableName }));
  }
}

SitesModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'clients',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: 'sites_email_unique',
    },
    maintenance_provider: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'sites',
    modelName: 'SitesModel',
    timestamps: true, // Enables timestamps
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
