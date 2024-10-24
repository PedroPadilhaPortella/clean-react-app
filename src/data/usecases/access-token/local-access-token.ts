import { AccessToken } from '@/domain/usecases/access-token';
import { Storage } from '@/data/protocols/cache/storage';

export class LocalAccessToken implements AccessToken {

  constructor(private readonly storage: Storage) { }

  async save(accessToken: string): Promise<void> {
    await this.storage.set('accessToken', accessToken);
  }
}