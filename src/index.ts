import dotenv from 'dotenv';
import express from 'express';
import { connect } from 'mongoose';
import deviceLocationRouter from './routes/device-location.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/device-location', deviceLocationRouter);

connect(process.env.MONGODB_URI!, {
  dbName: process.env.DB_NAME,
}).then(() => {
  app.get('/health', (_, res) => res.send({ status: 'OK' }));
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
