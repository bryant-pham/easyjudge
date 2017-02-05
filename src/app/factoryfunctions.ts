import { UriGenerator } from './shared/service/urigenerator';

export function uriGeneratorFactory() {
   return new UriGenerator({ scheme: 'http', host: 'localhost', port: '8080', context: 'api' });
}
