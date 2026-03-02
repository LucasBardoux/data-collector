import express, { Response} from 'express';
import {
  addDeviceLocation,
  deleteDeviceLocationsByDeviceId,
  getDeviceLocations,
} from '../services/device-location.service.js';
import { validateInput } from '../middlewares/validate-input.js';
import {
  DeleteDeviceLocationsRequest,
  deleteDeviceLocationsSchema,
  GetDeviceLocationRequest,
  getDeviceLocationSchema,
  PostDeviceLocationRequest,
  postDeviceLocationSchema,
} from '../validation/device-location.js';

const router = express.Router();

router.get(
  '/:deviceId',
  validateInput(getDeviceLocationSchema),
  async (req: GetDeviceLocationRequest, res: Response) => {
    const { params, query } = req;

    const deviceLocations = await getDeviceLocations(
      params.deviceId,
      query.start,
      query.end,
    );

    res.send(JSON.stringify(deviceLocations));
  },
);

router.post(
  '/:deviceId',
  validateInput(postDeviceLocationSchema),
  async (req: PostDeviceLocationRequest, res: Response) => {
    const { params, body } = req;

    const newDeviceLocation = await addDeviceLocation(
      params.deviceId,
      body.longitude,
      body.latitude,
    );

    res.send(JSON.stringify(newDeviceLocation));
  },
);

router.delete(
  '/:deviceId',
  validateInput(deleteDeviceLocationsSchema),
  async (req: DeleteDeviceLocationsRequest, res: Response) => {
    const { params } = req;

    const deleteResult = await deleteDeviceLocationsByDeviceId(params.deviceId);

    res.send(JSON.stringify(deleteResult));
  },
);

export default router;
