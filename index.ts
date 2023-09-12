import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //prisma queries

  // Create User
  console.log("Create User");
  const John = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@doe.com",
    },
  });
  console.log(John);

  // Get All Users
  console.log("Get All User");
  const users = await prisma.user.findMany({
    include: {
      articles: true,
    },
  });
  console.log(users);

  //Create Articles and connect with user
  console.log("Create Articles and connect with user");
  const article = await prisma.article.create({
    data: {
      title: "John's First article about Micro-Services",
      body: "microservices is awesome",
      author: {
        connect: {
          id: 1,
        },
      },
    },
  });

  console.log(article);

  //Create user and article ans accociate them
  console.log("Create user and article ans accociate them");
  const Bob = await prisma.user.create({
    data: {
      name: "Bob Smith",
      email: "bob@gmail.com",
      articles: {
        create: {
          title: "All about Prisma-ORM",
          body: "Just Reffer my Prisma-ORM Repo",
        },
      },
    },
  });

  console.log(Bob);

  //Get all articles
  console.log("Get all articles");
  const articles = await prisma.article.findMany();
  console.log(articles);

  //Loop Over users articles
  console.log("Loop Over users and articles");
  users.forEach((user) => {
    console.log(`Name : ${user.name} , Email : ${user.email}`);
    console.log("Articles : ");
    user.articles.forEach((article) => {
      console.log(`-Title : ${article.title}, -Body : ${article.body}`);
      console.log("\n");
    });
  });

  //Update Data
  console.log("Update Data");
  const user = await prisma.user.update({
    where: {
      id: 1,
    },
    data: {
      name: "Jr. John Doe",
    },
  });

  console.log(user);

  //Remove Data
  console.log("Remove Data");
  const removeArticle = await prisma.article.delete({
    where: {
      id: 2,
    },
  });

  console.log(removeArticle);
}

main()
  .then(async () => {
    prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
  });
