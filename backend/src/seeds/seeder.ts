import { prisma } from "../services";

async function seed() {
  try {
    // Seed users
    await prisma.user.createMany({
      data: [
        {
          name: 'Regular User',
          email: 'regular@example.com',
          password: 'regularpassword',
        },
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'adminpassword',
          role: 'ADMIN', // Assigning admin role
        },
      ],
    });

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
