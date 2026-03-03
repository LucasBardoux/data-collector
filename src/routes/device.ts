import express, { Response } from 'express';
import { validateInput } from '../middlewares/validate-input.js';
import {
  GetDeviceRequest,
  getDeviceSchema,
  PostDeviceRequest,
  postDeviceSchema,
} from '../validation/device.js';
import {
  createDevice,
  getAllDevices,
  getDevice,
} from '../services/device.service.js';

const router = express.Router();

router.post(
  '/',
  validateInput(postDeviceSchema),
  async (req: PostDeviceRequest, res: Response) => {
    const { name, type } = req.body;

    const device = await createDevice(name, type);

    res.json(device);
  },
);

router.get('/', async (_, res) => {
  const devices = await getAllDevices();

  res.json(devices);
});

router.get(
  '/:deviceId',
  validateInput(getDeviceSchema),
  async (req: GetDeviceRequest, res: Response) => {
    const { deviceId } = req.params;

    const device = await getDevice(deviceId);

    res.json(device);
  },
);

export default router;
