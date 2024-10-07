import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';

import { InterventionsQuestionTypesModel } from './InterventionsQuestionTypesModel.mjs';

export class InterventionsQuestionsEquipmentModel extends Model {
  static async getInterventionQuestions(
    intervention_type_id,
    equipment_type_id
  ) {
    // Fetch data using Sequelize, including associated models
    const results = await this.findAll({
      where: {
        intervention_type_id,
        equipment_type_id,
      },
      include: [
        {
          model: InterventionsQuestionTypesModel,
          attributes: ['id', 'name', 'type'],
        },
        // Optionally include other models if necessary
      ],
    });

    // Convert each Sequelize model instance to a plain object
    // const plainData = results.map((result) => {
    //   // Ensure each included model is also converted to a plain object
    //   return {
    //     ...result.get({ plain: true }),
    //     InterventionsQuestionTypesModel:
    //       result.InterventionsQuestionTypesModel.get({ plain: true }),
    //   };
    // });

    // return plainData; // Return plain data
    return results.map((result) => result.InterventionsQuestionTypesModel); // Return plain data
  }
}

InterventionsQuestionsEquipmentModel.init(
  {
    intervention_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'intervention_types',
        key: 'id',
      },
    },
    equipment_type_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'equipment_types',
        key: 'id',
      },
    },
    question_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'intervention_question_types',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'interventions_questions_equipment',
    modelName: 'InterventionsQuestionsEquipmentModel',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'intervention_type_id' },
          { name: 'equipment_type_id' },
          { name: 'question_type_id' },
        ],
      },
      {
        name: 'fk_question_types_config',
        using: 'BTREE',
        fields: [{ name: 'question_type_id' }],
      },
      {
        name: 'fk_equipment_types_config',
        using: 'BTREE',
        fields: [{ name: 'equipment_type_id' }],
      },
      {
        name: 'fk_intervention_types_config',
        using: 'BTREE',
        fields: [{ name: 'intervention_type_id' }],
      },
    ],
  }
);
