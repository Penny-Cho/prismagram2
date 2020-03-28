import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, name, lastName, bio = "" } = args;
      const exists = await prisma.$exists.user({
        OR: [
          {
            username
          },
          { email }
        ]
      });
      if (exists) {
        throw Error("닉네임 또는 이메일이 겹치네요. 다른 걸로 시도해주세요 ");
      }
      await prisma.createUser({
        username,
        email,
        name,
        lastName,
        bio
      });
      return true;
    }
  }
};
