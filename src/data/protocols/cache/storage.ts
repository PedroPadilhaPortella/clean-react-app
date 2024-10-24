export interface Storage {
  set: (key: string, value: any) => Promise<void>
}