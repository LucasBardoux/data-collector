import express, { Response } from 'express';
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
import { requestError } from '../utils/request-error.js';

const router = express.Router();

// DeviceLocation Routes
router.get(
  '/:deviceId',
  validateInput(getDeviceLocationSchema),
  async (req: GetDeviceLocationRequest, res: Response) => {
    const { params, query } = req;

    try {
      const deviceLocations = await getDeviceLocations(
        params.deviceId,
        query.start,
        query.end,
      );

      res.json(deviceLocations);
    } catch (error) {
      requestError(res, error);
    }
  },
);

router.post(
  '/:deviceId',
  validateInput(postDeviceLocationSchema),
  async (req: PostDeviceLocationRequest, res: Response) => {
    const { params, body } = req;

    try {
      const newDeviceLocation = await addDeviceLocation(
        params.deviceId,
        body.longitude,
        body.latitude,
      );

      res.json(newDeviceLocation);
    } catch (error) {
      requestError(res, error);
    }
  },
);

router.delete(
  '/:deviceId',
  validateInput(deleteDeviceLocationsSchema),
  async (req: DeleteDeviceLocationsRequest, res: Response) => {
    const { params } = req;
    try {
      const deleteResult = await deleteDeviceLocationsByDeviceId(
        params.deviceId,
      );

      res.json(deleteResult);
    } catch (error) {
      requestError(res, error);
    }
  },
);

export default router;
