import { AxiosError } from 'axios';

export type ApiError = AxiosError<{
  statusCode: number;
  exceptionCode: string;
  response: {
    statusCode: number;
    message: string;
    error: string;
    errors: string[];
  };
  timestamp: string;
  path: string;
  method: string;
  metas: { key: string; value: string }[];
}>;
