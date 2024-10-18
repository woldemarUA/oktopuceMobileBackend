import express from 'express';

const router = express.Router();

import { clientsRouter } from './routes/clientsRoutes.mjs';
import { equipmentsRouter } from './routes/equipmentRouter.mjs';
import { sitesRouter } from './routes/sitesRoutes.mjs';
import { interventionsRouter } from './routes/interventionRouter.mjs';

import { formsConfigRouter } from './routes/formsRoutes.mjs';

router.use('/clients', clientsRouter);
router.use('/equipments', equipmentsRouter);
router.use('/sites', sitesRouter);
router.use('/interventions', interventionsRouter);
router.use('/forms', formsConfigRouter);

router.get('/', async (req, res) => {
  try {
    res.status(200).json({ msg: 'mobile ok' });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
