import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

const secret = process.env.JWT_SECRET!;

export const authMiddleware = createMiddleware(async (c, next) => {
    const header = c.req.header("Authorization");
    if (!header || !header.startsWith("Bearer ")) {
        return c.json({ "success": false, "error":{ "message": "Unauthorized" , "code": "UNAUTHORIZED" } }, 401);
    }

    const token = header.split(" ")[1];
    try {
        const payload = await verify(token, secret, "HS256");
        c.set("user", payload);
        await next();
    } catch (error) {
        return c.json({ "success": false, "error":{ "message": "Unauthorized" , "code": "UNAUTHORIZED" } }, 401);
    }
});

export const requireRole = (...roles: string[]) => {
    return createMiddleware(async (c, next) => {
        const user = c.get("user");
        if (!roles.includes(user.role)) {
            return c.json({ "success": false, "error":{ "message": "Forbidden" , "code": "FORBIDDEN" } }, 403);
        }
        await next();
    });
};