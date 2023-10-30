import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma.service';
import { Todo, Prisma } from '@prisma/client';

@Injectable()
export class TodosService {
    constructor(private prisma: PrismaService) {}

    create(createTodoDto: CreateTodoDto) {
        return this.prisma.todo.create({
            data: createTodoDto,
        });
    }

    async findAll(): Promise<Todo[]> {
        return this.prisma.todo.findMany({ orderBy: { done: 'asc' } });
    }

    findOne(id: number) {
        return `This action returns a #${id} todo`;
    }

    update(id: number, updateTodoDto: UpdateTodoDto) {
        return this.prisma.todo.update({
            where: { id },
            data: updateTodoDto,
        });
    }

    remove(id: number) {
        return this.prisma.todo.delete({
            where: { id },
        });
    }
}
