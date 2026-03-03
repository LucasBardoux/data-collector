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
import { requestError } from '../utils/request-error.js';

const router = express.Router();

router.post(
  '/',
  validateInput(postDeviceSchema),
  async (req: PostDeviceRequest, res: Response) => {
    const { name, type } = req.body;

    try {
      const device = await createDevice(name, type);
      res.json(device);
    } catch (error) {
      requestError(res, error);
    }
  },
);

router.get('/', async (_, res) => {
  try {
    const devices = await getAllDevices();
    res.json(devices);
  } catch (error) {
    requestError(res, error);
  }
});

router.get(
  '/:deviceId',
  validateInput(getDeviceSchema),
  async (req: GetDeviceRequest, res: Response) => {
    const { deviceId } = req.params;

    try {
      const device = await getDevice(deviceId);
      res.json(device);
    } catch (error) {
      requestError(res, error);
    }
  },
);

export default router;
