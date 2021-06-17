export type Rates = {
  base: string;
  rates: {
    [key: string]: number;
  }
}

export type ValueConverted = {
  amount: number;
  from: string;
  to: string;
}

export abstract class CurrencyApi {
  abstract convertCurrency(value: number, from: string, to: string): Promise<ValueConverted>;

  abstract getRates(): Promise<Rates>;
}
