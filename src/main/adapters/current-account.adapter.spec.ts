import { mockAccountModel } from '@/domain/test';
import { LocalStorageAdapter } from '@/infra/cache/local-storage.adapter';
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from './current-account.adapter';
import { UnexpectedError } from '@/domain/errors';

jest.mock('@/infra/cache/local-storage.adapter');

describe('CurrentAccountAdapter', () => {

  test('Should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel();
    const localStorageSetSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');

    setCurrentAccountAdapter(account);
    expect(localStorageSetSpy).toHaveBeenCalledWith('currentAccount', account);
  });

  test('Should throw UnexpectedError', () => {
    expect(() => setCurrentAccountAdapter(undefined)).toThrow(new UnexpectedError());
  });

  test('Should call LocalStorageAdapter.get with correct value', () => {
    const account = mockAccountModel();
    const localStorageGetSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account);

    const result = getCurrentAccountAdapter();
    expect(result).toEqual(account);
    expect(localStorageGetSpy).toHaveBeenCalledWith('currentAccount');
  });
});