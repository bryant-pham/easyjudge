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

   it('should generate active events uri', () => {
      let result = uriGen.activeEvent();

      expect(result).toEqual('http://localhost:8080/api/events/active');
   });

   it('should generate score uri with eventId query param', () => {
      let result = uriGen.scoreWithQueryParams('1');

      expect(result).toEqual('http://localhost:8080/api/score?eventId=1');
   });

   it('should generate score uri with userId query param', () => {
      let result = uriGen.scoreWithQueryParams(null, '1');

      expect(result).toEqual('http://localhost:8080/api/score?userId=1');
   });

   it('should generate score uri with eventID and userId query param', () => {
      let result = uriGen.scoreWithQueryParams('1', '1');

      expect(result).toEqual('http://localhost:8080/api/score?eventId=1&userId=1');
   });

   it('should generate uri replacing placeholders in path', () => {
      let result = uriGen.generate('test/:?/:?/:?', 'john', 'cena', 'ayy');

      expect(result).toEqual('http://localhost:8080/api/test/john/cena/ayy');
   });

   it('should append query parameters', () => {
      let queryParams = new Map<string, string>();
      queryParams.set('first', 'john');
      queryParams.set('last', 'cena');
      let result = uriGen.appendQueryParams('test', queryParams);

      expect(result).toEqual('test?first=john&last=cena');
   });
});
