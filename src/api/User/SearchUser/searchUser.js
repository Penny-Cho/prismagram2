import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchUser: async(_, args) =>
         prisma.users({
            where: {
            OR: [
                { username_contains: args.term }, 
                { name_contains: args.term },
                { lastName_contains: args.term }
                ]
            }
        })
    }
};