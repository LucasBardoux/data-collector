import { Device, IDevice } from "../db/schema.js";

export async function createDevice(
  name: string,
  type: string,
): Promise<IDevice | undefined> {
  try {
    return await Device.create({ name, type });
  } catch (error) {
    console.log('error on createDevice', error);
  }
}

export async function getDevice(
  deviceId: string,
): Promise<IDevice | null | undefined> {
  try {
    return await Device.findById(deviceId);
  } catch (error) {
    console.log('error on getDevice', error);
  }
}

export async function getAllDevices(
): Promise<IDevice[] | null | undefined> {
  try {
    return await Device.find();
  } catch (error) {
    console.log('error on getAllDevices', error);
  }
}