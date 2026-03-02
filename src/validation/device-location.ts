import { z } from 'zod';
import { Request } from 'express';

const params = z.object({
  deviceId: z.string().min(1),
});

export const getDeviceLocationSchema = z.object({
  params,
  query: z.object({
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
  }),
});

export const postDeviceLocationSchema = z.object({
  params,
  body: z.object({
    longitude: z.number(),
    latitude: z.number(),
  }),
});

export const deleteDeviceLocationsSchema = z.object({
  params,
});

export type GetDeviceLocationInput = z.infer<typeof getDeviceLocationSchema>;
export type PostDeviceLocationInput = z.infer<typeof postDeviceLocationSchema>;
export type DeleteDeviceLocationsInput = z.infer<
  typeof deleteDeviceLocationsSchema
>;

type ReducedRequest = Omit<Request, 'body'>;

export type GetDeviceLocationRequest = GetDeviceLocationInput & ReducedRequest;
export type PostDeviceLocationRequest = PostDeviceLocationInput &
  ReducedRequest;
export type DeleteDeviceLocationsRequest = DeleteDeviceLocationsInput &
  ReducedRequest;
