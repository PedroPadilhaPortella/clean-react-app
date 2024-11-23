export interface Storage {
  set: (key: string, value: object) => Promise<void>
}