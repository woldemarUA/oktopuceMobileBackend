import express from 'express';

import db from '../../db/associations/associationsMobile.mjs';

import { generateFormConfig } from '../../actions/formsActions.mjs';
import { EquipmentsModel } from '../../db/entities/Equipments/EquipmentsModel.mjs';
import { Clients } from '../../db/entities/Clients/Clients.mjs';
import { InterventionsModel } from '../../db/entities/Interventions/InterventionsModel.mjs';
import { SitesModel } from '../../db/entities/Sites/SitesModel.mjs';

import { optionsRouter } from './optionsRoutes.mjs';

export const formsConfigRouter = express.Router();

formsConfigRouter.use('/options', optionsRouter);

formsConfigRouter.get('/equipment', async (req, res) => {
  try {
    const formConf = generateFormConfig(EquipmentsModel);

    delete formConf.id;
    delete formConf.created_at;
    delete formConf.updated_at;

    res.status(200).json({
      msg: 'ok',
      formConf,
      type: 'equipment',
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'erorr fetching equipment form config', erorr: true });
  }
});

formsConfigRouter.get('/client', async (req, res) => {
  try {
    const formConf = generateFormConfig(Clients);
    res.status(200).json({ msg: 'ok', formConf, type: 'clients' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'erorr fetching client form config', erorr: true });
  }
});

formsConfigRouter.get('/intervention', async (req, res) => {
  try {
    const formConf = generateFormConfig(InterventionsModel);
    res.status(200).json({ msg: 'ok', formConf, type: 'intervention' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'erorr fetching intervention form config', erorr: true });
  }
});
formsConfigRouter.get('/site', async (req, res) => {
  try {
    const formConf = generateFormConfig(SitesModel);
    res.status(200).json({ msg: 'ok', formConf, type: 'site' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: 'erorr fetching site form config', erorr: true });
  }
});
