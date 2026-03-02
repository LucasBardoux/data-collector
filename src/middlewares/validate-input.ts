import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateInput = <T extends z.ZodTypeAny>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return res.status(400).json({ errors: result.error.message });
    }

    next();
  };
};