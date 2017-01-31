import { UriGenerator } from './urigenerator';

describe('UriGenerator', () => {
   let uriGen = new UriGenerator({scheme: 'http', host: 'localhost', port: '8080', context: 'api'});

   it('should generate score uri', () => {
      let result = uriGen.score();

      expect(result).toEqual('http://localhost:8080/api/score');
   });

   it('should generate login uri', () => {
      let result = uriGen.login();

      expect(result).toEqual('http://localhost:8080/api/login');
   });

   it('should generate admin login uri', () => {
      let result = uriGen.adminLogin();

      expect(result).toEqual('http://localhost:8080/api/admin/login');
   });

   it('should generate events uri', () => {
      let result = uriGen.events();

      expect(result).toEqual('http://localhost:8080/api/events');
   });

   it('should generate uri replacing placeholders in path', () => {
      let result = uriGen.generate('test/:?/:?/:?', 'john', 'cena', 'ayy');

      expect(result).toEqual('http://localhost:8080/api/test/john/cena/ayy');
   });
});
