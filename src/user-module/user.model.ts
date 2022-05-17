import { Table, Column, Model, PrimaryKey, Default, DataType, Unique, IsEmail, AllowNull } from 'sequelize-typescript';
import { getColumnEnum } from 'src/_common/app-configs/columnEnum';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from './user.enum';

@Table
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @IsNotEmpty({
    message: 'name is required'
  })
  @IsString()
  @Column
  name: string;

  @IsNotEmpty({
    message: 'email is required'
  })
  @Unique
  @IsEmail
  @Column
  email: string;

  @AllowNull(false)
  @Column({
    type: getColumnEnum(UserRoles)
  })
  role: UserRoles;

  @IsNotEmpty({
    message: 'password is required'
  })
  @Column
  password: string;
  
};