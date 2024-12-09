import axios from 'axios';

import { mockAxios, mockHttpResponse } from '@/infra/test';
import { AxiosHttpClient } from '@/infra/http-client';
import { mockHttpRequest } from '@/data/test';

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
};

jest.mock('axios');

const createSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return { sut, mockedAxios };
};

describe('AxiosHttpClient', () => {

  describe('POST', () => {
    test('Should request axios with correct params', async () => {
      const request = mockHttpRequest();
      const { sut, mockedAxios } = createSut();
      await sut.request(request);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        url: request.url,
        method: request.method,
        headers: request.headers,
        data: request.body
      });
    });

    test('Should return the correct statusCode and body when requesting axios', async () => {
      const { sut, mockedAxios } = createSut();
      const response = await sut.request(mockHttpRequest());
      const axiosResponse = await mockedAxios.request.mock.results[0].value;
      expect(response).toEqual({ statusCode: axiosResponse.status, body: axiosResponse.data });
    });

    test('Should return the correct statusCode and body on failure', () => {
      const { sut, mockedAxios } = createSut();
      mockedAxios.request.mockRejectedValueOnce({ response: mockHttpResponse() });
      const promise = sut.request(mockHttpRequest());
      expect(promise).toEqual(mockedAxios.request.mock.results[0].value);
    });
  });
});