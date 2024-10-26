import { DataTypes, Model, fn, col } from 'sequelize';
import sequelize from '../../db_connector.mjs';

import { EquipmentBrandsModel } from './EqipmentBrandsModel.mjs';
import { EquipmentTypesModel } from './EquipmentTypesModel.mjs';

export class EquipmentsModel extends Model {
  static finalitesFieldNames = null;

  static async getBySiteId(site_id) {
    const response = await this.findAll({
      where: { site_id },
      attributes: [
        ['id', 'value'],
        ['serial_number', 'name'],
      ],
    });

    return response.map((res) => res.dataValues);
  }

  static async getBySitesIds(siteIDs) {
    const response = [];
    for (const id of siteIDs) {
      const equipment = await this.getBySiteId(id);
      // if (equipment.length > 0) response.push({ ...equipment, site_id: id });
      if (equipment.length > 0) {
        for (const eq of equipment)
          response.push({ ...eq, site_id: id, link: this.tableName });
        // response.push({ ...equipment, site_id: id })
      }
    }
    return response;
  }

  static async getEquipmentOptions() {
    const queryOptions = {
      attributes: [
        ['id', 'value'],
        [
          fn('concat', col('equipment_type.name'), ' ', col('serial_number')),
          'label',
        ],
      ],
      include: [
        {
          model: EquipmentTypesModel,
          as: 'equipment_type', // Ensure this alias matches your model association
          attributes: [], // We don't need to select any attributes directly from this model
        },
        // {
        //   model: EquipmentBrandsModel,
        //   as: 'equipment_brand', // Ensure this alias matches your model association
        //   attributes: [], // We don't need to select any attributes directly from this model
        // },
      ],
    };

    const response = await this.findAll(queryOptions);
    return response.map((res) => res.dataValues);
  }

  static getFinalitiesFieldNames() {
    if (!this.finalitesFieldNames) {
      const dummyInstance = EquipmentsModel.build({});
      const finalites = dummyInstance.finalites;
      this.finalitesFieldNames = Object.keys(finalites);
    }
    return this.finalitesFieldNames;
  }
}

EquipmentsModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    parent_equipment_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'equipments',
        key: 'id',
      },
    },
    site_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'sites',
        key: 'id',
      },
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
    location_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'equipment_locations',
        key: 'id',
      },
    },
    nfc_tag_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'nfc_tags',
        key: 'id',
      },
    },
    gas_type_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'gas_types',
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
    equipment_brand_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'equipment_brands',
        key: 'id',
      },
    },
    installation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location_precision: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    // name: {
    //   type: DataTypes.STRING(255),
    //   allowNull: false,
    //   field: 'serial_number',
    // },
    serial_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    remote_control_number: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    gas_weight: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    is_plancher_chauffant: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_plancher_raffraichssant: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_radiateurs: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    ventilo_convecteurs: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    has_leak_detection: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },
    last_leak_detection: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    next_leak_detection: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    unite_exterieur_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'equipment_ext_types',
        key: 'id',
      },
    },
    equipment_model: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    leak_detection_periodicity: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ballon_capacite: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    unite_interieur_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'equipment_int_types',
        key: 'id',
      },
    },
    finalites: {
      type: DataTypes.VIRTUAL,
      allowNull: true,
      get() {
        return {
          is_plancher_chauffant: this.getDataValue('is_plancher_chauffant'),
          is_plancher_raffraichssant: this.getDataValue(
            'is_plancher_raffraichssant'
          ),
          is_radiateurs: this.getDataValue('is_radiateurs'),
          ventilo_convecteurs: this.getDataValue('ventilo_convecteurs'),
        };
      },
      set(value) {
        this.setDataValue('is_plancher_chauffant', value.is_plancher_chauffant);
        this.setDataValue(
          'is_plancher_raffraichssant',
          value.is_plancher_raffraichssant
        );
        this.setDataValue('is_radiateurs', value.is_radiateurs);
        this.setDataValue('ventilo_convecteurs', value.ventilo_convecteurs);
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
    tableName: 'equipments',
    modelName: 'EquipmentModel',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
