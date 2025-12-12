import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;

  @IsString()
  @Length(6)
  @IsNotEmpty()
  password: string;
}
