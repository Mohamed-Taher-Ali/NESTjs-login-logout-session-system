import { repositories } from 'src/_common/database-module/database.repositories';
import { UserRepo } from 'src/_common/database-module/db-repository/user-repo';
import { IRegisterParams, UserDTO } from './user.types';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { UserRoles } from './user.enum';

@Injectable()
export class UserService {
  constructor(
    @Inject(repositories.USERS_REPOSITORY)
    private readonly userModel: typeof User,
    @Inject(repositories.USERS_REPOSITORY)
    private readonly userRepo: UserRepo,
  ) {}

  getUserPlainFields(user: User): UserDTO {
    const {
      email,
      id,
      name,
      password,
      role,
      createdAt,
      deletedAt,
      updatedAt,
      ...rest
    } = user;

    return {
      id,
      role,
      name,
      email,
    };
  }

  async findUsersPaginated(
    offset: number,
    limit: number,
  ): Promise<UserDTO[]> {
    const users = await this.userModel.findAll({
      offset, limit
    });

    return users.map(u => this.getUserPlainFields(u))
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id
      }
    });

    return user.get({plain: true});
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        email
      }
    });

    return user?.get({plain: true});
  }

  async getAdminsCount(){
    return await this.userModel.count({
      where: { role: UserRoles.ADMIN }
    });
  }

  async createNewUser(input: IRegisterParams): Promise<User> {
    let newUser = new User(input);
    newUser = await newUser.save();

    return newUser.get({ plain: true });
  }
}
