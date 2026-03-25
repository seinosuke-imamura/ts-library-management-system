import { Hono } from "hono";
import { sign } from "hono/jwt";
import { hash, compare } from "bcryptjs";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();
const userSchema = z.object({
    id: z.string().min(1),
    username: z.string().min(1),
    password: z.string().min(1),
    role: z.enum(["ADMIN", "STAFF", "USER"]),
});
const secret = process.env.JWT_SECRET!;


app.post("/register", zValidator("json", userSchema.omit({ id: true })), async (c) => {
    const { username, password, role } = c.req.valid("json");
    const hashedPassword = await hash(password, 10);
    const user = await db.insert(users).values({ id: crypto.randomUUID(), username, password: hashedPassword, role }).returning();
    const { password: drop, ...rest } = user[0];
    return c.json({ "success": true, "data": rest });
});

app.post("/login", zValidator("json", userSchema.pick({ username: true, password: true })), async (c) => {
    const { username, password } = c.req.valid("json");
    const user = await db.select().from(users).where(eq(users.username, username)).get();
    if (!user) {
        return c.json({ "success": false, "error":{ "message": "User not found" , "code": "NOT_FOUND" } }, 404);
    }
    if (!await compare(password, user.password)) {
        return c.json({ "success": false, "error":{ "message": "Invalid password" , "code": "INVALID_PASSWORD" } }, 401);
    }
    const payload = {
        sub: user.id,
        role: user.role,
    };
    const token = await sign(payload, secret);
    return c.json({ "success": true, "data": { "token": token } });
});

export default app;