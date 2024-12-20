import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

import router from './mobile/routes/mobileRouter.mjs';

config();

const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: '*',
  })
);
const server = createServer(app);

app.use(express.json());

app.use('/mobile', router);
app.get('/', (req, res) => {
  try {
    res.status(200).json({ msg: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'error ' });
  }
});

if (typeof PhusionPassenger !== 'undefined') {
  server.listen('passenger', () => {
    console.log('Server running with Phusion Passenger');
  });
} else {
  server.listen(PORT, () =>
    console.log(`Server is listeting at http://localhost:${PORT}`)
  );
}
