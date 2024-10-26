import faker from 'faker';

import { RegisterParams } from '@/domain/usecases';
import { RemoteRegister } from '@/data/usecases';
import { HttpPostClientSpy } from '@/data/test';
import { AccountModel } from '@/domain/models';
import { mockRegister } from '@/domain/test';

type SutTypes = {
  sut: RemoteRegister
  httpPostClientSpy: HttpPostClientSpy<RegisterParams, AccountModel>
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<RegisterParams, AccountModel>();
  const sut = new RemoteRegister(url, httpPostClientSpy);
  return { sut, httpPostClientSpy };
};

describe('RemoteRegister', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'http://localhost:5000/api/login';
    const { sut, httpPostClientSpy } = createSut(url);
    await sut.register(mockRegister());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = createSut();
    const registerParams = mockRegister();
    await sut.register(registerParams);
    expect(httpPostClientSpy.body).toEqual(registerParams);
  });
});