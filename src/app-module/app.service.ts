import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AuthService } from 'src/auth-module/auth.service';

@Injectable()
// bootstrapping to seed db
//https://stackoverflow.com/questions/65766885/how-to-create-seed-in-nestjs
export class AppService implements OnApplicationBootstrap {
  constructor(
    private readonly authService: AuthService
  ){ }
  
  onApplicationBootstrap() {
    (async () => {

      //seed admin if not exists
      await this.authService.adminSeed();




    })();
  }

  getHello(): string {
    return 'Hello World!';
  }
}