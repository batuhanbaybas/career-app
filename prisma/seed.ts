// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as faker from '@faker-js/faker';
import { AuthDto } from 'src/auth/dto/auth.dto';

const prisma = new PrismaClient();

const fakerUser = (): AuthDto => ({
  email: faker.faker.internet.email(),
  password: faker.faker.internet.password(),
});

const fakerJob = () => ({
  role: faker.faker.random.word(),
  company: faker.faker.random.word(),
  workType: faker.faker.random.words(),
  location: faker.faker.address.city(),
  status: faker.faker.random.word(),
});

async function main() {
  const fakerRounds = 10;
  dotenv.config();
  console.log('Seeding...');
  /// --------- Users ---------------
  for (let i = 0; i < fakerRounds; i++) {
    await prisma.user.create({ data: fakerUser() });
  }
  /// --------- Jobs ---------------
  for (let i = 0; i < fakerRounds; i++) {
    await prisma.jobs.create({ data: fakerJob() });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
