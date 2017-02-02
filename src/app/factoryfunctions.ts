import { UriGenerator } from './shared/service/urigenerator';

export const uriGeneratorFactory = () =>
   new UriGenerator({ scheme: 'http', host: 'localhost', port: '8080', context: 'api' });
