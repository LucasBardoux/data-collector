import { Document, Schema, model } from 'mongoose';

export interface IDeviceLocation extends Document {
  deviceId: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  createdAt: Date;
  updatedAt: Date;
}

const deviceLocationSchema = new Schema<IDeviceLocation>(
  {
    deviceId: { type: String, required: true, index: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [lon, lat],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

deviceLocationSchema.index({ deviceId: 1, createdAt: -1 });
deviceLocationSchema.index({ location: '2dsphere' });

export const DeviceLocation = model<IDeviceLocation>(
  'DeviceLocation',
  deviceLocationSchema,
);