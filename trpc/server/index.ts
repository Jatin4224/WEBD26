import { publicProcedure, router } from "./trpc";
import { email, z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});

export const appRouter = router({
  //define procedure

  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async (opts) => {
      //context

      //in real world check if username exist creat odo

      let email = opts.input.email;
      let password = opts.input.password;

      //do database stuff here

      //do validation if user exist or not
      // jwt.sign() - todo create token
      let token = "123123";

      return {
        token,
      };
    }),
  createTodo: publicProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .mutation(async (opts) => {
      console.log(opts.ctx.username);
      return {
        id: "1",
      };
    }),
});

const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];
    //todo do jwt.verify() if authHeader is correct return right username else return undefined
    return {
      username: "123",
    };
  },
});
server.listen(3000);

export type AppRouter = typeof appRouter;
