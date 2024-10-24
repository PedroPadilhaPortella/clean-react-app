export interface AccessToken {
  save: (accessToken: string) => Promise<void>
}