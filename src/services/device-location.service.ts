import { DeleteResult, Types } from 'mongoose';
import { DeviceLocation, IDeviceLocation } from '../db/schema.js';

export async function addDeviceLocation(
  deviceId: string,
  longitude: number,
  latitude: number,
): Promise<IDeviceLocation | undefined> {
  try {
    return await DeviceLocation.create({
      device: new Types.ObjectId(deviceId),
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    });
  } catch (error) {
    console.log('error on addDeviceLocation', error);
  }
}

export async function getDeviceLocations(
  deviceId: string,
  startDate?: Date,
  endDate?: Date,
) {
  try {
    const query: any = { device: new Types.ObjectId(deviceId) };

    // Zeitraum-Filter dynamisch hinzufügen
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = startDate; // Größer oder gleich
      if (endDate) query.createdAt.$lte = endDate; // Kleiner oder gleich
    }

    return await DeviceLocation.find(query)
      .sort({ createdAt: -1 })
      .lean();
  } catch (error) {
    console.log('error on getDeviceLocations', error);
  }
}

export async function deleteDeviceLocationsByDeviceId(
  deviceId: string,
): Promise<DeleteResult | undefined> {
  try {
    return await DeviceLocation.deleteMany({
      device: new Types.ObjectId(deviceId),
    });
  } catch (error) {
    console.log('error on deleteDeviceLocationsByDeviceId', error);
  }
}
