import express from 'express';
import db from '../../db/associations/associationsMobile.mjs';
export const clientsRouter = express.Router();

clientsRouter.get('/', async (req, res) => {
  try {
    const clients = await db.Clients.findAll({
      include: { all: true },
    });
    res.status(200).json({ msg: 'ok', data: clients });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
