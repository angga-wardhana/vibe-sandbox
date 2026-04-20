import { Elysia, t } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";

const app = new Elysia()
  .get("/", () => "OK")
  .get("/users", async () => {
    return await db.select().from(users);
  })
  .post(
    "/users",
    async ({ body }) => {
      const newUser = await db.insert(users).values(body).returning();
      return newUser[0];
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
      }),
    }
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
