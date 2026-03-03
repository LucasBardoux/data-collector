import { DeleteResult, Types } from 'mongoose';
import { DeviceLocation, IDeviceLocation } from '../db/schema.js';

export async function addDeviceLocation(
  deviceId: string,
  longitude: number,
  latitude: number,
): Promise<IDeviceLocation> {
  return await DeviceLocation.create({
    device: new Types.ObjectId(deviceId),
    location: {
      type: 'Point',
      coordinates: [longitude, latitude],
    },
  });
}

export async function getDeviceLocations(
  deviceId: string,
  startDate?: Date,
  endDate?: Date,
) {
  const query: any = { device: new Types.ObjectId(deviceId) };

  // Zeitraum-Filter dynamisch hinzufügen
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = startDate; // Größer oder gleich
    if (endDate) query.createdAt.$lte = endDate; // Kleiner oder gleich
  }

  return await DeviceLocation.find(query).sort({ createdAt: -1 }).lean();
}

export async function deleteDeviceLocationsByDeviceId(
  deviceId: string,
): Promise<DeleteResult> {
  return await DeviceLocation.deleteMany({
    device: new Types.ObjectId(deviceId),
  });
}
