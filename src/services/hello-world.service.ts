import {HelloWorldApi} from './hello-world.api';
export class HelloWorldService implements HelloWorldApi {

  async greeting(name: string = 'World'): Promise<string> {
    return `Hello, ${name}!`;
  }
}
