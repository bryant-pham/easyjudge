export class Admin {
   public static from(json: any): Admin {
      return new Admin(json.id, json.username);
   }

   public id: string;
   public username: string;
   public password: string;

   constructor(username: string, password: string, id?: string) {
      this.id = id;
      this.username = username;
      this.password = password;
   }
}
