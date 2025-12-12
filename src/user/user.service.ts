import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Omit<User, 'password'> | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  // Função para criar usuário
  async createUser(data: Prisma.UserCreateInput) {
    const emailExists = await this.prisma.user.count({
      where: { email: data.email },
    });
    if (emailExists > 0)
      throw new ConflictException('Email já cadastrado no sistema');
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    return this.prisma.user.create({ data: { ...data, password: hash } });
  }
  // Função para atualizar usuário
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }
  // Função para deletar usuário
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
