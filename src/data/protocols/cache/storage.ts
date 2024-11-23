export interface Storage {
  set: (key: string, value: object) => Promise<void>
  get: (key: string) => Promise<any>
}