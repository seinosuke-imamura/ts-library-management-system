import { Hono } from "hono";
import { db } from "../db";
import { rentals } from "../db/schema";
import { authMiddleware, requireRole } from "../middleware/auth";
import { books, users } from "../db/schema";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { and , isNull } from "drizzle-orm";


const app = new Hono<{ Variables: { user: { sub: string , role: string } } }>();

const rentalSchema = z.object({
    bookId: z.string().min(1),
});

app.get("/my", authMiddleware, async (c) => {
    const  user  = c.get("user");
    const getRentals = await db.select().from(rentals).where(eq(rentals.userId, user.sub)).all();
    return c.json({ "success": true, "data": getRentals });
});

app.post("/", authMiddleware, zValidator("json", rentalSchema), async (c) => {
    const user = c.get("user");
    const { bookId } = c.req.valid("json");
    const getBook = await db.select().from(books).where(eq(books.id, bookId)).get();
    if (!getBook) {
        return c.json({ "success": false, "error":{ "message": "Book not found" , "code": "NOT_FOUND" } }, 404);
    }
    if (getBook.stock <= 0) {
        return c.json({ "success": false, "error":{ "message": "Book out of stock" , "code": "OUT_OF_STOCK" } }, 400);
    }
    if (await db.select().from(rentals).where(and(eq(rentals.userId, user.sub), eq(rentals.bookId, bookId), isNull(rentals.returnDate))).get()) {
        return c.json({ "success": false, "error":{ "message": "Book already rented" , "code": "ALREADY_RENTED" } }, 400);
    }
    const addRental = await db.insert(rentals).values({ id: crypto.randomUUID(), userId: user.sub, bookId, rentedDate: Date.now(), dueDate: Date.now()  + 7 * 24 * 60 * 60 * 1000 }).returning();
    await db.update(books).set({ stock: getBook.stock - 1 }).where(eq(books.id, bookId));
    return c.json({ "success": true, "data": addRental });
});

app.put("/:id/return", authMiddleware, async (c) => {
    const user = c.get("user");
    const id = c.req.param("id");
    const getRental = await db.select().from(rentals).where(eq(rentals.id, id)).get();
    if (!getRental) {
        return c.json({ "success": false, "error":{ "message": "Rental not found" , "code": "NOT_FOUND" } }, 404);
    }
    if (getRental.returnDate !== null) {
        return c.json({ "success": false, "error":{ "message": "Rental already returned" , "code": "ALREADY_RETURNED" } }, 400);
    }
    const getBook = await db.select().from(books).where(eq(books.id, getRental.bookId)).get();
    const updateRental = await db.update(rentals).set({ returnDate: Date.now() }).where(eq(rentals.id, id)).returning();
    await db.update(books).set({ stock: (getBook?.stock ?? 0) + 1 }).where(eq(books.id, getRental.bookId));
    return c.json({ "success": true, "data": updateRental });
});

app.get("/", authMiddleware, requireRole("ADMIN", "STAFF"), async (c) => {
    const getRentals = await db.select({ id: rentals.id, username: users.username,bookTitle: books.title, rentedDate: rentals.rentedDate, dueDate: rentals.dueDate, returnDate: rentals.returnDate}).from(rentals).innerJoin(books, eq(rentals.bookId, books.id)).innerJoin(users, eq(rentals.userId, users.id)).all();
    return c.json({ "success": true, "data": getRentals });
});

export default app;