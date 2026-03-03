import { Device, IDevice } from '../db/schema.js';

export async function createDevice(
  name: string,
  type: string,
): Promise<IDevice> {
  return await Device.create({ name, type });
}

export async function getDevice(
  deviceId: string,
): Promise<IDevice | null | undefined> {
  return await Device.findById(deviceId);
}

export async function getAllDevices(): Promise<IDevice[] | null | undefined> {
  return await Device.find();
}
