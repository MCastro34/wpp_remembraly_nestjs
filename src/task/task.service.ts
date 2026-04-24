import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task } from '../../generated/prisma';

@Injectable()
export class TaskService {
  constructor(private readonly _prismaService: PrismaService) {}

  async getTasks(): Promise<Task[]> {
    return this._prismaService.task.findMany({
      include: {
        project: {
          include: {
            client: true,
          },
        },
      },
    });
  }
}
