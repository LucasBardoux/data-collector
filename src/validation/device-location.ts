import { z } from 'zod';
import { deviceParamsSchema } from './device.js';
import { ReducedRequest } from '../types/index.js';

export const getDeviceLocationSchema = z.object({
  params: deviceParamsSchema,
  query: z.object({
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
  }),
});

export const postDeviceLocationSchema = z.object({
  params: deviceParamsSchema,
  body: z.object({
    longitude: z.number(),
    latitude: z.number(),
  }),
});

export const deleteDeviceLocationsSchema = z.object({
  params: deviceParamsSchema,
});

export type GetDeviceLocationInput = z.infer<typeof getDeviceLocationSchema>;
export type PostDeviceLocationInput = z.infer<typeof postDeviceLocationSchema>;
export type DeleteDeviceLocationsInput = z.infer<
  typeof deleteDeviceLocationsSchema
>;

export type GetDeviceLocationRequest = GetDeviceLocationInput & ReducedRequest;
export type PostDeviceLocationRequest = PostDeviceLocationInput &
  ReducedRequest;
export type DeleteDeviceLocationsRequest = DeleteDeviceLocationsInput &
  ReducedRequest;
