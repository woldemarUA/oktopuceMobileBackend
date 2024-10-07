import express from 'express';
import db from '../../db/associations/associationsMobile.mjs';

export const sitesRouter = express.Router();

sitesRouter.get('/', async (req, res) => {
  try {
    const sites = await db.SitesModel.findAll({ include: { all: true } });
    res.status(200).json({ msg: 'ok', data: sites });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
