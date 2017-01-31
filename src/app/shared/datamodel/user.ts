export class User {
   public id: string;
   public username: string;

   constructor(username: string, id?: string) {
      this.id = id;
      this.username = username;
   }
}
