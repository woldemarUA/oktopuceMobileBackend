import { DataTypes, Model } from 'sequelize';

import sequelize from '../../db_connector.mjs';

export class InterventionsModel extends Model {}

InterventionsModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    site_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'sites',
        key: 'id',
      },
    },
    equipment_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'equipments',
        key: 'id',
      },
    },
    technicien_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    company_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    intervention_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    produit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'equipment_produit',
        key: 'id',
      },
    },
    endroit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'equipment_endroit',
        key: 'id',
      },
    },
    equipment_type_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'equipment_types',
        key: 'id',
      },
    },
    intervention_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'intervention_types',
        key: 'id',
      },
    },
    additional_information: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    signature_client: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    signature_technicien: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    document_upload: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'interventions',
    modelName: 'InterventionsModel',
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
        name: 'fk_intervention_type',
        using: 'BTREE',
        fields: [{ name: 'intervention_type_id' }],
      },
      {
        name: 'fk_produit_type',
        using: 'BTREE',
        fields: [{ name: 'produit_id' }],
      },
      {
        name: 'fk_endroit_type',
        using: 'BTREE',
        fields: [{ name: 'endroit_id' }],
      },
      {
        name: 'fk_equipment_type',
        using: 'BTREE',
        fields: [{ name: 'equipment_type_id' }],
      },
      {
        name: 'fk_site_type',
        using: 'BTREE',
        fields: [{ name: 'site_id' }],
      },
      {
        name: 'fk_technicien',
        using: 'BTREE',
        fields: [{ name: 'technicien_id' }],
      },
      {
        name: 'fk_client',
        using: 'BTREE',
        fields: [{ name: 'client_id' }],
      },
    ],
  }
);
