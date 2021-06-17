import { CurrencyService } from './currency.service';
import { ContainerConfiguration, Scope } from 'typescript-ioc';
import { CurrencyApi } from './currency.api';

const config: ContainerConfiguration[] = [
  {
    bind: CurrencyApi,
    to: CurrencyService,
    scope: Scope.Singleton
  }
];

export default config;