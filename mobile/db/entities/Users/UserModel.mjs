import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';

export class UsersModel extends Model {
  static async getUserType(user_type) {
    const res = await this.findAll({
      attributes: ['id', 'first_name', 'last_name'],
      where: { user_type_id: user_type },
    });

    const records = res.map((r) => ({
      value: r.dataValues.id,
      label: `${r.dataValues.first_name} ${r.dataValues.last_name}`,
    }));

    return records;
  }
}

UsersModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    addresse: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    code_postale: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_types',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'UsersModel',
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
        name: 'fk_user_types',
        using: 'BTREE',
        fields: [{ name: 'user_type_id' }],
      },
    ],
  }
);
