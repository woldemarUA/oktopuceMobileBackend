import express from 'express';

import db from '../../db/associations/associationsMobile.mjs';
import { extractId } from '../../utlis/extractId.mjs';

import { interventionQuestions } from '../../utlis/interventionsQuestions.mjs';

export const interventionsRouter = express.Router();

interventionsRouter.get('/eq-id/:id', async (req, res) => {
  const id = extractId(req);

  try {
    const interventions = await db.InterventionsModel.findAll({
      where: { equipment_id: id },
      include: { all: true },
    });
    res.status(200).json({ msg: 'ok', data: interventions });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

interventionsRouter.get('/question-id/:id', async (req, res) => {
  const id = extractId(req);

  try {
    const result = await db.InterventionsQuestionsModel.findAll({
      where: { intervention_id: id },
      attributes: [
        'id',
        'question_type_id',
        'response',
        'parent_id',
        'intervention_id',
      ],
      include: {
        model: db.InterventionsQuestionTypesModel,
        as: 'question_name',
        attributes: ['name'],
      },
      raw: true,
      nest: true,
    });

    const changeName = result.map((item) => ({
      ...item,
      question_name: item.question_name.name,
    }));

    const parentSort = { questions: [], parent: [] };
    for (const item of changeName) {
      if (item.response === '0' || item.response === '1') {
        item.response = item.response === '1' ? 'Oui' : 'Non';
      }

      if (item.parent_id) {
        parentSort.parent.push(item);
      } else {
        parentSort.questions.push(item);
      }
    }

    const groupedRes = parentSort.parent.reduce((acc, item) => {
      const parent = item.parent_id || 'no_parent';
      if (!acc[parent]) {
        acc[parent] = [];
      }
      acc[parent].push(item);
      return acc;
    }, {});

    const { questions } = parentSort;

    res.status(200).json({
      msg: 'ok',
      data: {
        questions,
        parent: Object.keys(groupedRes).length > 0 ? groupedRes : null,
      },
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

interventionsRouter.get('/', async (req, res) => {
  try {
    const interventions = await db.InterventionsModel.findAll({
      include: { all: true },
    });
    res.status(200).json({ msg: 'ok', data: interventions });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
