import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {}

    async canActivate(
      context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as Request;
        const user = await this.authService.validateRequest(request);

        request['user'] = user;

        return !!user;
    }
}