import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth-module/guards/role.guard';
import { UserService } from './user.service';
import { UserRoles } from './user.enum';
import { UserDTO } from './user.types';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RoleGuard('in', [
    UserRoles.ADMIN
  ]))
  @Get('/')
  async getUsers(
    @Query('offset') offset,
    @Query('limit') limit,
  ): Promise<UserDTO[]>
  {
    offset = Number(offset) ? Number(offset) : 0;
    limit = Number(limit) ? Number(limit) : 10;

    return await this.userService.findUsersPaginated(
      offset, limit
    )
  }

}
