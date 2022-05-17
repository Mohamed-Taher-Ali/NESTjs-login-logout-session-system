import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, mixin } from '@nestjs/common';
import { ErrorMessages } from 'src/_common/app-configs/error-messages';
import { UserRoles } from 'src/user-module/user.enum';
import { AuthService } from '../auth.service';
import { UserRolesCase } from '../auth.types';


export const RoleGuard = (
  userRolesCase: UserRolesCase,
  userRoles: UserRoles[]
): any => {
    //mixin apply @Injectable to class
    @Injectable()
    class Guard implements CanActivate {
      public constructor(
        readonly authService: AuthService,
      ) { }

      async canActivate(
        context: ExecutionContext,
      ): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as Request;
        
        const user = await this.authService.validateRequest(request);

        const isValidRole = this.authService.validateRole(
          userRolesCase, user?.role, userRoles
        );

        if (!userRoles.length || !isValidRole) {
          throw new HttpException(
            ErrorMessages.AUTHORIZATION_FAILED,
            HttpStatus.FORBIDDEN
          );
        }

        request['user'] = user;

        return isValidRole;
      }
    };

    const returnClass = mixin(Guard)
    return returnClass;
}