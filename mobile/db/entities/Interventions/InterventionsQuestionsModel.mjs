import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db_connector.mjs';
import { InterventionsQuestionTypesModel } from './InterventionsQuestionTypesModel.mjs';

export class InterventionsQuestionsModel extends Model {
  static async getQuestions(intervention_id) {
    const res = await this.findAll({
      where: {
        intervention_id,
      },
      attributes: ['id', 'response', 'question_type_id', 'parent_id'],
      include: [
        {
          model: InterventionsQuestionTypesModel,
          as: 'question_name',
          attributes: ['name', 'type'],
        },
      ],
    });

    return res.map((q) => ({
      id: q.dataValues.id,
      response: q.dataValues.response,
      question_type_id: q.dataValues.question_type_id,
      name: q.dataValues.question_name.dataValues.name,
      type: q.dataValues.question_name.dataValues.type,
      parent: q.dataValues.parent_id,
    }));
  }
}

InterventionsQuestionsModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    question_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'intervention_question_types',
        key: 'id',
      },
    },
    response: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.ENUM(
        'soufflage',
        'pompeEau',
        'pression',
        'etancheite',
        'securite',
        'resistance',
        'depannage'
      ),
      allowNull: true,
    },

    intervention_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'interventions',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'interventions_questions',
    modelName: 'InterventionsQuestionsModel',
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
        name: 'fk_intervention_question_types',
        using: 'BTREE',
        fields: [{ name: 'question_type_id' }],
      },
      {
        name: 'fk_intervention_id',
        using: 'BTREE',
        fields: [{ name: 'intervention_id' }],
      },
    ],
  }
);
