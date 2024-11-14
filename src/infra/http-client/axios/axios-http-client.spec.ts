import axios from 'axios';

import { mockAxios, mockHttpResponse } from '@/infra/test';
import { AxiosHttpClient } from '@/infra/http-client';
import { mockGetRequest, mockPostRequest } from '@/data/test';

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
    test('Should call axios POST with correct params', async () => {
      const request = mockPostRequest();
      const { sut, mockedAxios } = createSut();
      await sut.post(request);
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });

    test('Should return the correct statusCode and body when calling axios with POST', async () => {
      const { sut, mockedAxios } = createSut();
      const response = await sut.post(mockPostRequest());
      const axiosResponse = await mockedAxios.post.mock.results[0].value;
      expect(response).toEqual({ statusCode: axiosResponse.status, body: axiosResponse.data });
    });

    test('Should return the correct statusCode and body on failure', () => {
      const { sut, mockedAxios } = createSut();
      mockedAxios.post.mockRejectedValueOnce({ response: mockHttpResponse() });
      const promise = sut.post(mockPostRequest());
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
  });

  describe('GET', () => {
    test('Should call axios GET with correct params', async () => {
      const request = mockGetRequest();
      const { sut, mockedAxios } = createSut();
      await sut.get(request);
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url);
    });

    test('Should return the correct statusCode and body when calling axios with GET', async () => {
      const { sut, mockedAxios } = createSut();
      const response = await sut.get(mockGetRequest());
      const axiosResponse = await mockedAxios.get.mock.results[0].value;
      expect(response).toEqual({ statusCode: axiosResponse.status, body: axiosResponse.data });
    });

    test('Should return the correct statusCode and body on failure', () => {
      const { sut, mockedAxios } = createSut();
      mockedAxios.get.mockRejectedValueOnce({ response: mockHttpResponse() });
      const promise = sut.get(mockGetRequest());
      expect(promise).toEqual(mockedAxios.get.mock.results[0].value);
    });
  });
});