import { AccessToken } from '@/domain/usecases/access-token';

export class AccessTokenMock implements AccessToken {
  accessToken: string;

  async save(accessToken: string): Promise<void> {
    await Promise.resolve(this.accessToken = accessToken);
  }
}