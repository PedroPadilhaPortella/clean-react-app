import { AccessToken } from '@/domain/usecases/access-token';
import { Storage } from '@/data/protocols/cache/storage';
import { UnexpectedError } from '@/domain/errors';

export class LocalAccessToken implements AccessToken {

  constructor(private readonly storage: Storage) { }

  async save(accessToken: string): Promise<void> {
    if (!accessToken) throw new UnexpectedError();
    await this.storage.set('accessToken', accessToken);
  }
}