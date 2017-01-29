export class User {
   public username: string;
   public password: string;
   public isAdmin: boolean;

   constructor(username: string, isAdmin = false, password?: string) {
      this.username = username;
      this.isAdmin = isAdmin;
      this.password = password;
   }
}
