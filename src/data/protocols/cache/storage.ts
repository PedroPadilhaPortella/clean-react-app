export interface Storage {
  set: (key: string, value: object) => void
  get: (key: string) => any
}