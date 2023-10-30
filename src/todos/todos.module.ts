import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { PrismaService } from '../prisma.service';
import { TodosController } from './todos.controller';

@Module({
    controllers: [TodosController],
    providers: [TodosService, PrismaService],
})
export class TodosModule {}
