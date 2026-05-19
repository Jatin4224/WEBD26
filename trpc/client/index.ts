//client/index.ts

import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";
//     👆 **type-only** imports are stripped at build time
// Pass AppRouter as a type parameter. 👇 This lets `trpc` know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
      async headers() {
        return {
          Authroization: "Bearer 123",
        };
      },
    }),
  ],
});

async function main() {
  let response = await trpc.signUp.mutate({
    email: "jatin@gmail.com",
    password: "123456",
  });
  console.log(response);
}

main();
