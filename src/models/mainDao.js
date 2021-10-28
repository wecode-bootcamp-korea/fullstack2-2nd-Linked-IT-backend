import prisma from '../../prisma';

const getUsers = () => {
  return await prisma.$queryRaw`
  `;
};

const getPosts = () => {
  return await prisma.$queryRaw`
  `;
};

const getComments = () => {
  return await prisma.$queryRaw`
  `;
};

export default {};
