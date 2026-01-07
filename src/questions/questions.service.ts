import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';
import { PaginatedResponse } from 'src/common/pagination/paginated-response';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto, userId: number) {
    return await this.prisma.questions.create({
      data: { ...createQuestionDto, userId },
    });
  }

  async findAll(page: number, limit: number) {
    page = Math.max(1, page);
    limit = Math.max(1, limit);
    const skip = (page - 1) * limit;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.questions.findMany({
        skip,
        take: limit,
        include: {
          user: { select: { name: true } },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.questions.count(),
    ]);
    return new PaginatedResponse(data, total, page, limit);
  }

  async findOne(id: number) {
    return await this.prisma.questions.findUnique({
      where: { id },
      include: {
        answers: true,
        user: { select: { name: true, email: true } },
      },
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prisma.questions.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: number) {
    return this.prisma.questions.delete({ where: { id } });
  }
}
