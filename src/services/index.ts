import { Container } from "typescript-ioc";

export * from './currency.api';
export * from './currency.service';

import config from './ioc.config';

Container.configure(...config);