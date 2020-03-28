import {prisma} from "../../../../generated/prisma-client";
import { generateToken} from "../../../utils";

export default {
    Mutation: {
        confirmSecret: async(_, args) => {
            const {email, secret} = args;
            const user = await prisma.user({ email });
            if (user.loginSecret == secret) {
                await prisma.updateUser({
                    where: {id: user.id},
                    data: {
                        loginSecret: ""
                    }
                });
                return generateToken(user.id);
            } else {
                throw Error("Wrong email/secret conmbination");
            }
        }
    }
};


// {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrN3lvNTc3dWRxbnIwOTM0cmNkbjliZmsiLCJpYXQiOjE1ODUwMzE2MTV9.bFV9QXCaaM_A8FFg5U62GYbe37ECqtzTKNKHfax_XF4"}