import fetch from 'node-fetch';
import { Errors } from 'typescript-rest';
import { convert } from 'cashify';

import config from '../config';

import { CurrencyApi, Rates, ValueConverted } from './currency.api';

export class CurrencyService implements CurrencyApi {

  serviceExchangeUrl: string;
  serviceExchangeId: string;

  constructor() {
    const { openExchangeId, openExchangeUrl } = config.openExchange;
    this.serviceExchangeUrl = openExchangeUrl;
    this.serviceExchangeId = openExchangeId;
  }

  async convertCurrency(value: number, from: string, to: string): Promise<ValueConverted> {
    const { rates } = await this.getRates();
    const ratesArray = Object.keys(rates);
    const isValidSourceCurrency = ratesArray.some((rate) => rate === from.toUpperCase());
    const isValidDestCurrency = ratesArray.some((rate) => rate === to.toUpperCase());
    if (isValidDestCurrency && isValidSourceCurrency) {
      const result = convert(value, { from, to, base: 'USD', rates });
      return { amount: result, from, to };
    }
    throw new Errors.BadRequestError('Invalid source e/or destination currency.');
  }

  async getRates(): Promise<Rates> {
    try {
      const externalResponse = await fetch(`${this.serviceExchangeUrl}/latest.json?app_id=${this.serviceExchangeId}`);
      const { base, rates } = await externalResponse.json();
      return { base, rates };
    } catch (error) {
      throw new Errors.InternalServerError(`An error occurred. Try again ${error}`);
    }
  }
};
