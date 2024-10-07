import express from 'express';
import db from '../../db/associations/associationsMobile.mjs';
export const equipmentsRouter = express.Router();

import { extractId } from '../../utlis/extractId.mjs';

equipmentsRouter.get('/site-id/:id', async (req, res) => {
  const id = extractId(req);

  try {
    const equipments = await db.EquipmentsModel.findAll({
      where: { site_id: id },
      include: { all: true },
    });
    res.status(200).json({ msg: 'ok', data: equipments });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
equipmentsRouter.get('/', async (req, res) => {
  try {
    const equipments = await db.EquipmentsModel.findAll({
      include: { all: true },
    });
    res.status(200).json({ msg: 'ok', data: equipments });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
