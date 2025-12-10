import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Prisma, User as UserModel } from 'generated/prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('user')
export class UserController {
  //Service de usuário
  constructor(private readonly userService: UserService) {}
  //Rota para criar um usuário
  @UseGuards(AuthGuard)
  @Post()
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.user({ id: Number(id) });
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data,
    });
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
