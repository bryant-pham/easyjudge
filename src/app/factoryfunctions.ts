import { UriGenerator } from './shared/service/urigenerator';

export function uriGeneratorFactory() {
   return new UriGenerator('http', 'localhost', '8080', 'api' );
}
