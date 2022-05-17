import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserDTO } from 'src/user-module/user.types';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('/register')
  async register(
    @Body() body
  ): Promise<UserDTO>{
    return await this.authService.register(body);
  }


  @Post('/login')
  async login(
    @Body() body
  ): Promise<UserDTO>{
    return await this.authService.login(body);
  }
  
  @Post('/logout')
  async logout(
    @Body() body: { id: string }
  ): Promise<Boolean>{
    return await this.authService.logout(body.id);
  }
}
