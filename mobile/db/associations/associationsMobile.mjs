import { Sequelize } from 'sequelize';
import sequelize from '../db_connector.mjs';
import { Clients } from '../entities/Clients/Clients.mjs';
import { ClientTypes } from '../entities/Clients/ClientsTypes.mjs';
import { EquipmentTypesModel } from '../entities/Equipments/EquipmentTypesModel.mjs';
import { InterventionsTypesModel } from '../entities/Interventions/InterventionsTypesModel.mjs';
import { InterventionsQuestionTypesModel } from '../entities/Interventions/InterventionsQuestionTypesModel.mjs';
import { InterventionsQuestionsEquipmentModel } from '../entities/Interventions/InterventionsQuestionsEquipmentModel.mjs';
import { InterventionsQuestionsModel } from '../entities/Interventions/InterventionsQuestionsModel.mjs';
import { InterventionsDepQuestionsModel } from '../entities/Interventions/InterventionsDepQuestionsModel.mjs';
import { SitesModel } from '../entities/Sites/SitesModel.mjs';
import { FilesModel } from '../entities/Utils/FileModel.mjs';
import { InterventionsModel } from '../entities/Interventions/InterventionsModel.mjs';
import { EquipmentsModel } from '../entities/Equipments/EquipmentsModel.mjs';
import { UsersModel } from '../entities/Users/UserModel.mjs';
import { AuthDetailsModel } from '../entities/Users/AuthModel.mjs';

import { EquipmentProduitModel } from '../entities/Equipments/EquipmentProduitModel.mjs';
import { EquipmentEndroitModel } from '../entities/Equipments/EquipmentEndroitModel.mjs';
import { EquipmentLocationsModel } from '../entities/Equipments/EquipmentLocationsModel.mjs';
import { NfcTagsModel } from '../entities/Equipments/NfcTagsModel.mjs';
import { EquipmentGasTypesModel } from '../entities/Equipments/EquipmentGasTypesModel.mjs';

import { EquipmentBrandsModel } from '../entities/Equipments/EqipmentBrandsModel.mjs';
import { EquipmentExtTypesModel } from '../entities/Equipments/EquipmentExtTypesModel.mjs';
import { EquipmentIntTypesModel } from '../entities/Equipments/EquipmentIntTypesModel.mjs';

// Equipments Associations

EquipmentsModel.belongsTo(SitesModel, {
  foreignKey: 'site_id',
  as: 'site',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
SitesModel.hasMany(EquipmentsModel, {
  foreignKey: 'site_id',
  as: 'equipmentsSite',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

// EquipmentsModel.belongsTo(EquipmentsModel, {
//   foreignKey: 'parent_equipment_id',
//   as: 'child',
//   onDelete: 'RESTRICT',
//   onUpdate: 'RESTRICT',
// });
// EquipmentsModel.hasMany(EquipmentsModel, {
//   foreignKey: 'parent_equipment_id',
//   as: 'parent',
//   onDelete: 'RESTRICT',
//   onUpdate: 'RESTRICT',
// });
EquipmentsModel.belongsTo(EquipmentProduitModel, {
  foreignKey: 'produit_id',
  as: 'produit',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
EquipmentProduitModel.hasMany(EquipmentsModel, {
  foreignKey: 'produit_id',
  as: 'equipmentProduit',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

EquipmentsModel.belongsTo(EquipmentEndroitModel, {
  foreignKey: 'endroit_id',
  as: 'endroit',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

EquipmentEndroitModel.hasMany(EquipmentsModel, {
  foreignKey: 'endroit_id',
  as: 'equipmentEndroit',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

EquipmentsModel.belongsTo(EquipmentLocationsModel, {
  foreignKey: 'location_id',
  as: 'location',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
EquipmentLocationsModel.hasMany(EquipmentsModel, {
  foreignKey: 'endroit_id',
  as: 'equipmentLocation',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
EquipmentsModel.belongsTo(NfcTagsModel, {
  foreignKey: 'nfc_tag_id',
  as: 'nfc_tag',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

NfcTagsModel.hasMany(EquipmentsModel, {
  foreignKey: 'nfc_tag_id',
  as: 'equipmentNfc',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

EquipmentsModel.belongsTo(EquipmentGasTypesModel, {
  foreignKey: 'gas_type_id',
  as: 'gas_type',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

EquipmentGasTypesModel.hasMany(EquipmentsModel, {
  foreignKey: 'gas_type_id',
  as: 'equipmentsGasType',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

EquipmentsModel.belongsTo(EquipmentTypesModel, {
  foreignKey: 'equipment_type_id',
  as: 'equipment_type',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
EquipmentTypesModel.hasMany(EquipmentsModel, {
  foreignKey: 'equipment_type_id',
  as: 'equipmentEquipment_type',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
EquipmentBrandsModel.hasMany(EquipmentsModel, {
  foreignKey: 'equipment_brand_id',
  as: 'equipmentEquipment_brand',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

EquipmentsModel.belongsTo(EquipmentBrandsModel, {
  foreignKey: 'equipment_brand_id',
  as: 'equipment_brand',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

EquipmentsModel.belongsTo(EquipmentExtTypesModel, {
  foreignKey: 'unite_exterieur_type_id',
  as: 'exterior_type',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

EquipmentExtTypesModel.hasMany(EquipmentsModel, {
  foreignKey: 'unite_exterieur_type_id',
  as: 'equipmentExterior_type',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

EquipmentsModel.belongsTo(EquipmentIntTypesModel, {
  foreignKey: 'unite_interieur_type_id',
  as: 'interior_type',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
EquipmentIntTypesModel.hasMany(EquipmentsModel, {
  foreignKey: 'unite_interieur_type_id',
  as: 'equipmentInterior_type',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
// Define associations
Clients.belongsTo(ClientTypes, {
  foreignKey: 'type_id',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});
ClientTypes.hasMany(Clients, {
  foreignKey: 'type_id',
});

SitesModel.belongsTo(Clients, {
  as: 'client',
  foreignKey: 'client_id',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});
Clients.hasMany(SitesModel, {
  as: 'sites',
  foreignKey: 'client_id',
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
});

InterventionsTypesModel.belongsToMany(InterventionsQuestionTypesModel, {
  through: InterventionsQuestionsEquipmentModel,
  foreignKey: 'intervention_type_id',
  otherKey: 'question_type_id',
});
InterventionsQuestionsEquipmentModel.belongsTo(
  InterventionsQuestionTypesModel,
  {
    foreignKey: 'question_type_id',
  }
);
InterventionsQuestionsEquipmentModel.belongsTo(InterventionsTypesModel, {
  foreignKey: 'intervention_type_id',
});

EquipmentTypesModel.belongsToMany(InterventionsQuestionTypesModel, {
  through: InterventionsQuestionsEquipmentModel,
  foreignKey: 'equipment_type_id',
  otherKey: 'question_type_id',
});

InterventionsQuestionTypesModel.belongsToMany(InterventionsTypesModel, {
  through: InterventionsQuestionsEquipmentModel,
  foreignKey: 'question_type_id',
  otherKey: 'intervention_type_id',
});

InterventionsQuestionTypesModel.belongsToMany(EquipmentTypesModel, {
  through: InterventionsQuestionsEquipmentModel,
  foreignKey: 'question_type_id',
  otherKey: 'equipment_type_id',
});

InterventionsDepQuestionsModel.belongsTo(InterventionsQuestionTypesModel, {
  foreignKey: 'parent_q_id',
  as: 'ParentQuestion',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
InterventionsDepQuestionsModel.belongsTo(InterventionsQuestionTypesModel, {
  foreignKey: 'child_q_id',
  as: 'ChildQuestion',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
InterventionsQuestionTypesModel.hasMany(InterventionsDepQuestionsModel, {
  foreignKey: 'parent_q_id',
  as: 'ParentQuestions',
});
InterventionsQuestionTypesModel.hasMany(InterventionsDepQuestionsModel, {
  foreignKey: 'child_q_id',
  as: 'ChildQuestions',
});

InterventionsQuestionsModel.belongsTo(InterventionsQuestionTypesModel, {
  foreignKey: 'question_type_id',
  as: 'question_name',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
InterventionsQuestionTypesModel.hasMany(InterventionsQuestionsModel, {
  foreignKey: 'question_type_id',
});

FilesModel.belongsTo(InterventionsModel, {
  foreignKey: 'intervention_id',
  as: 'interventions_file_upload',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
InterventionsModel.hasMany(FilesModel, {
  foreignKey: 'intervention_id',
  as: 'files_int',
});

InterventionsModel.belongsTo(EquipmentsModel, {
  foreignKey: 'equipment_id',
  as: 'equipment_interventions',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

InterventionsModel.belongsTo(EquipmentEndroitModel, {
  foreignKey: 'endroit_id',
  as: 'endroit_int',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
InterventionsModel.belongsTo(Clients, {
  foreignKey: 'client_id',
  as: 'client_int',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
InterventionsModel.belongsTo(EquipmentTypesModel, {
  foreignKey: 'equipment_type_id',
  as: 'eq_type_int',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
InterventionsModel.belongsTo(InterventionsTypesModel, {
  foreignKey: 'intervention_type_id',
  as: 'intervention_type',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
InterventionsModel.belongsTo(EquipmentProduitModel, {
  foreignKey: 'produit_id',
  as: 'produit_int',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
InterventionsModel.belongsTo(SitesModel, {
  foreignKey: 'site_id',
  as: 'site_int',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});
InterventionsModel.belongsTo(UsersModel, {
  foreignKey: 'technicien_id',
  as: 'technicien',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
});

UsersModel.hasOne(AuthDetailsModel, { foreignKey: 'user_id' });
AuthDetailsModel.belongsTo(UsersModel, { foreignKey: 'user_id' });

// Equipments associations

// Export the initialized Sequelize instance and models
const db = {
  sequelize,
  Sequelize,
  Clients,
  ClientTypes,
  EquipmentTypesModel,
  InterventionsTypesModel,
  InterventionsQuestionTypesModel,
  InterventionsQuestionsEquipmentModel,
  InterventionsQuestionsModel,
  InterventionsDepQuestionsModel,
  SitesModel,
  FilesModel,
  InterventionsModel,
  EquipmentsModel,
  UsersModel,
  AuthDetailsModel,
  SitesModel,
  EquipmentProduitModel,
  EquipmentEndroitModel,
  EquipmentLocationsModel,
  NfcTagsModel,
  EquipmentGasTypesModel,
  EquipmentBrandsModel,
  EquipmentExtTypesModel,
  EquipmentIntTypesModel,
};

// Sync all models
db.sequelize.sync();

export default db;
