import z from "zod";
import { ReducedRequest } from "../types/index.js";

export const deviceParamsSchema = z.object({
  deviceId: z.string().min(1),
});

export const postDeviceSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    type: z.string().min(1),
  }),
});

export const getDeviceSchema = z.object({
  params: deviceParamsSchema,
});

export type PostDeviceInput = z.infer<typeof postDeviceSchema>;
export type GetDeviceInput = z.infer<typeof getDeviceSchema>;

export type PostDeviceRequest = PostDeviceInput & ReducedRequest;
export type GetDeviceRequest = GetDeviceInput & ReducedRequest;
