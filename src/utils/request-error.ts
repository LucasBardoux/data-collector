import { Response } from 'express';
import { mongo } from 'mongoose';

export function requestError(res: Response, error: unknown) {
  console.log(error);

  if (error instanceof mongo.MongoServerError && error.code === 11000) {
    res.status(400).send('Item already exists!');
  } else {
    res.status(500).send('Internal server error.');
  }
}
