import { Application } from 'express';
import * as request from 'supertest';
import { Container, Scope} from 'typescript-ioc';

import { CurrencyApi } from '../../src/services';
import { buildApiServer } from '../helper';

class MockCurrencyService implements CurrencyApi {
  convertCurrency = jest.fn().mockReturnValue({ amount: 1234, from: 'USD', to: 'BRL' });
  getRates = jest.fn().mockReturnValue({ base: 'USD', rates: { USD: 123, BRL: 1234 }});
}

describe('currency.controller', () => {

  let app: Application;
  let mockConvertCurrency: jest.Mock;
  let mockGetRates: jest.Mock;

  beforeEach(() => {
    const apiServer = buildApiServer();

    app = apiServer.getApp();

    Container.bind(CurrencyApi).scope(Scope.Singleton).to(MockCurrencyService);

    const mockService: CurrencyApi = Container.get(CurrencyApi);
    mockConvertCurrency = mockService.convertCurrency as jest.Mock;
    mockGetRates = mockService.getRates as jest.Mock;
  });

  test('canary validates test infrastructure', () => {
    expect(true).toBe(true);
  });

  describe('Given /api/currency/rates', () => {
    const expectedResponse = { base: 'USD', rates: { USD: 123, BRL: 1234 }};

    beforeEach(() => {
      mockGetRates.mockReturnValueOnce(Promise.resolve(expectedResponse));
    });

    test('should return the correct rates', (done) => {
      request(app).get('/api/currency/rates').expect(200).expect(expectedResponse, done);
    });
  });

  describe('Given /api/currency/convert/:value/:from/:to', () => {
    const value = 1234;
    const from = 'USD';
    const to = 'BRL';
    const expectedResponse = { amount: 1234, from: 'USD', to: 'BRL' };

    beforeEach(() => {
      mockConvertCurrency.mockReturnValueOnce(Promise.resolve(expectedResponse));
    });

    test('should convert the currency passed properly', done => {
      request(app).get(`/api/currency/convert/${value}/${from}/${to}`).expect(200).expect(expectedResponse, done);
    });
  });

});
