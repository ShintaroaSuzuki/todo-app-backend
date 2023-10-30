import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const todoData: Prisma.TodoCreateInput[] = [
    {
        title: 'Buy milk',
        done: false,
    },
    {
        title: 'Buy eggs',
        done: true,
    },
    {
        title: 'Write an article',
        done: false,
    },
];

const transfer = async () => {
    const todos = [];
    for (const t of todoData) {
        const todo = prisma.todo.create({
            data: t,
        });
        todos.push(todo);
    }
    await prisma.$transaction(todos);
};

const main = async () => {
    console.log(`Start seeding ...`);
    await transfer();
    console.log(`Seeding finished.`);
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
