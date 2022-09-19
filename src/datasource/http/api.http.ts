import { ApiError } from '@src/types/api-error.type';
import axios, { Axios, AxiosInstance, AxiosResponse, Method } from 'axios';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

type RequestFn<T> = (client: AxiosInstance) => Promise<AxiosResponse<T>>;

class HttpClient {
  private baseHttpClient: AxiosInstance;

  constructor() {
    this.baseHttpClient = axios.create({
      baseURL: this.apiDataSourceUri(),
    });
  }

  private client(uri: string, headers?: Record<string, string>): AxiosInstance {
    const client = axios.create({
      baseURL: `${this.apiDataSourceUri()}${uri}`,
      headers,
    });

    client.interceptors.response.use(
      r => r,
      e => Promise.reject(e)
    );
    return client;
  }

  apiDataSourceUri() {
    return process.env.API_DATASOURCE_URI;
  }

  setToken(idToken: string) {
    this.baseHttpClient.interceptors.request.use(
      config => {
        config.headers.authorization = `Bearer ${idToken}`;
        return config;
      },
      e => Promise.reject(e)
    );
    return this;
  }

  /**
   * This method should be used to foward all api request to the backend service using FACADE pattern
   *
   * @param req
   * @returns
   */
  async foward<T = unknown>(req: NextApiRequest): Promise<AxiosResponse<T>> {
    const url = req.url.replace('/api/datasource', '');
    const data = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const requestClient = this.client(url, { authorization: `Bearer ${data.idToken}` });

    return requestClient.request<T>({
      method: req.method as Method,
      data: req.body,
    });
  }

  /**
   * This method should be use for request something to the backend service using base client.
   * IMPORTANT: It should be used only in server side
   *
   */
  async request<T>(cb: RequestFn<T>): Promise<T> {
    try {
      const result = await cb(this.baseHttpClient);
      return result.data;
    } catch (error) {
      const err = error as ApiError;
      console.group(`error response`);
      console.log(JSON.stringify(err.request));
      console.log(JSON.stringify(err.response));
      throw error;
    }
  }
}
export const httpClient = new HttpClient();
