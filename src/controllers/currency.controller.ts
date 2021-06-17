import { GET, Path, PathParam } from 'typescript-rest';
import { Inject } from 'typescript-ioc';

import { CurrencyApi, Rates } from '../services';

@Path('/currency')
export class CurrencyController {

  @Inject
  service: CurrencyApi;

  @Path('/rates')
  @GET
  async getCurrentRates(): Promise<Rates> {
    return this.service.getRates();
  }

  @Path('/convert/:value/:from/:to')
  @GET
  async convertCurrency(@PathParam('value') value: number, @PathParam('from') from: string,
    @PathParam('to') to: string): Promise<any> {
    return this.service.convertCurrency(value, from, to);
  }
}
