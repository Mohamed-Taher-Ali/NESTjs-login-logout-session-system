import { EncryptionService } from 'src/_common/encryption-module/encrypt.service';
import { ILoginParams, IRegisterParams, UserDTO, UserWithToken } from 'src/user-module/user.types';
import { ITokenPayload } from 'src/_common/encryption-module/encrypt.types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorMessages } from 'src/_common/app-configs/error-messages';
import { UserService } from 'src/user-module/user.service';
import { UserRoles } from 'src/user-module/user.enum';
import { User } from 'src/user-module/user.model';
import { UserRolesCase } from './auth.types';
import { UserCacheService } from 'src/_common/cache-module/user-cache.service';

const bcrypt = require("bcrypt");


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userCacheService: UserCacheService,
    private readonly encryptionService: EncryptionService,
  ) { }

  async validateUserForLogin(input: ILoginParams) {
    const user = await this.userService.findUserByEmail(input.email);

    if (!user) throw new HttpException(
      ErrorMessages.EMAIL_OR_PASSWORD_NOT_CORRECT,
      HttpStatus.FORBIDDEN
    );

    const validPassword = await bcrypt.compare(
      input.password, user.password
    );

    if (!validPassword) throw new HttpException(
      ErrorMessages.EMAIL_OR_PASSWORD_NOT_CORRECT,
      HttpStatus.FORBIDDEN
    );

    return user;
  }

  generateToken(user: User) {
    const payload: ITokenPayload = { id: user.id };
    return this.encryptionService.encode(payload);
  }

  getUserWithToken(user: User): UserDTO {
    const token = this.generateToken(user);
    const userPlainFields = this.userService.getUserPlainFields(user);
    return { ...userPlainFields, token };
  }

  async login(input: ILoginParams): Promise<UserDTO> {
    const user = await this.validateUserForLogin(input);
    const token = this.generateToken(user);
    const { password, ...userData } = user;
    
    await this.userCacheService.addUser({
      ...user,
      token
    } as UserWithToken);

    return {
      ...userData as UserDTO,
      token
    };
  }

  async logout(userId: string): Promise<Boolean> {
    await this.userCacheService.deleteUser(userId);
    return true;
  }

  async hashPassword(password: string){
    return await bcrypt.hash(
      password, 10
    );
  }

  async registerNewUser(input: IRegisterParams){
    const hashedPassword = await this.hashPassword(input.password);

    input.password = hashedPassword;
    return await this.userService.createNewUser(input);
  }

  async register(input: IRegisterParams): Promise<UserDTO> {
    const user = await this.userService.findUserByEmail(input.email);

    if (user) throw new HttpException(
      ErrorMessages.USER_ACTUALLY_EXIST,
      HttpStatus.FORBIDDEN
    );

    const newUser = await this.registerNewUser({
      role: UserRoles.USER,
      ...input,
    });

    return this.userService.getUserPlainFields(newUser);
  }

  getHeaderAuthorization(request: Request) {
    const authorization = request?.headers['authorization'] || '';
    return authorization;
  }

  decodePayload(authorization: string): ITokenPayload{
    const payload = this.encryptionService.decode(authorization);

    if(authorization && !payload?.id) throw new HttpException(
      ErrorMessages.AUTHORIZATION_FAILED,
      HttpStatus.FORBIDDEN
    );
    
    return payload;
  }

  async validateRequest(request: Request): Promise<User> {
    const authorization = this.getHeaderAuthorization(request);
    const payload = this.decodePayload(authorization);
    
    if(!payload?.id) throw new HttpException(
      ErrorMessages.AUTHORIZATION_FAILED,
      HttpStatus.FORBIDDEN
    );

    const storedUser = await this.userCacheService.checkUser(payload.id);
    if(storedUser?.token === authorization) return storedUser as User;

    throw new HttpException(
      ErrorMessages.SESSION_HAS_EXPIRED,
      HttpStatus.FORBIDDEN
    );
  }

  validateRole(
    roleCase: UserRolesCase,
    role: UserRoles,
    roles: UserRoles[]
    ) {
      const inUserRoles = roles.includes(role);
      return roleCase === 'in' ? inUserRoles : !inUserRoles;
  }

  async adminSeed() {
    const adminsCount = await this.userService.getAdminsCount();
    if(!adminsCount) await this.registerNewUser({
      email: 'admin@admin.com',
      role: UserRoles.ADMIN,
      password: '12345',
      name: 'admin',
    });
  }

}
