import envConfig from '../config';

const url = envConfig.development.baseUrl;

export type ConversionType = {
  value: number | string;
  from: string;
  to: string;
  time?: number;
};

export type ConversionSavedType = {
  amount: number;
  from: string;
  to: string;
};

async function convertCurrency({
  value,
  from,
  to,
}: ConversionType): Promise<ConversionSavedType | undefined> {
  try {
    const response = await fetch(
      `${url}/currency/convert/${value}/${from}/${to}`
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('An error has occurred on Convert request', error);
  }
}

export { convertCurrency };
