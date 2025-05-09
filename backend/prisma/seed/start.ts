import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  console.log('💫 seed executing ...');
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      name: 'john',
      email: 'john@gmail.com',
      posts: {
        create: {
          title: 'first article',
          content: 'hello!world!',
          published: true,
        },
      },
    },
  });

	await prisma.machine.create({
		data:{
			floor: 1,
			active: false,
			available: true,
			hasLaundry: false,
		}
	})

	await prisma.machine.create({
		data:{
			floor: 2,
			active: false,
			available: true,
			hasLaundry: false,
		}
	})

  console.log('💫 seed finished.');
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
