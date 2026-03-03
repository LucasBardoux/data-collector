import type { Request } from 'express';

export type ReducedRequest = Omit<Request, 'body'>;