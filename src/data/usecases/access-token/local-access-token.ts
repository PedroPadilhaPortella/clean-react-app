import { AccessToken } from '@/domain/usecases/access-token';
import { SetStorage } from '@/data/protocols/cache/set-storage';

export class LocalAccessToken implements AccessToken {

  constructor(private readonly setStorage: SetStorage) { }

  async save(accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken);
  }
}