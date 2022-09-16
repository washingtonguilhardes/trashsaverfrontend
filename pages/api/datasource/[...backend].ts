import { httpClient } from '@src/datasource/http';
import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await httpClient.foward(req);
    res.status(response.status).send(response.data);
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      res.status(err.response.status).send(err.response.data);
    } else {
      res.status(500).send({ error });
    }
  }
}
