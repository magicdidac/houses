
export interface IPersonFunctions {
  rate: (value: number) => Promise<void>
  notes: (value: string) => Promise<void>
}
