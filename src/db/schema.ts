import { Document, Schema, model, Types } from 'mongoose';

// Device Collection
export interface IDevice extends Document {
  name: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

const deviceSchema = new Schema<IDevice>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

deviceSchema.index({
  name: 1,
  type: 1
}, {
  unique: true
})

export const Device = model<IDevice>('Device', deviceSchema);

// DeviceLocation Collection mit Referenz zu Device
export interface IDeviceLocation extends Document {
  device: Types.ObjectId;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  createdAt: Date;
  updatedAt: Date;
}

const deviceLocationSchema = new Schema<IDeviceLocation>(
  {
    device: {
      type: Schema.Types.ObjectId,
      ref: 'Device',
      required: true,
      index: true,
    },
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

deviceLocationSchema.index({ device: 1, createdAt: -1 });
deviceLocationSchema.index({ location: '2dsphere' });

export const DeviceLocation = model<IDeviceLocation>(
  'DeviceLocation',
  deviceLocationSchema,
);