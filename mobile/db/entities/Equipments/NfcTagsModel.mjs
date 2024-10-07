import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';

export class NfcTagsModel extends Model {
  static async getNfcs() {
    const queryOptions = {
      attributes: [
        ['id', 'value'],
        ['uuid', 'label'],
      ],
    };
    const response = await this.findAll(queryOptions);
    return response.map((res) => res.dataValues);
  }
}

NfcTagsModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      unique: 'nfc_tags_uuid_unique',
    },
  },
  {
    sequelize,
    modelName: 'NfcTagsModel',
    tableName: 'nfc_tags',
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
        name: 'nfc_tags_uuid_unique',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'uuid' }],
      },
    ],
  }
);
