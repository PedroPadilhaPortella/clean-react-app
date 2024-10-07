import { mockAxios } from '../../test';
import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import { mockPostRequest } from '@/data/test';

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

  test('Should call axios POST with correct params', async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = createSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return the correct statusCode and body when calling axios with POST', () => {
    const { sut, mockedAxios } = createSut();
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});