import { db } from "../db/index";
import { books } from "../db/schema";
import { eq , like} from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware, requireRole } from "../middleware/auth";


const app = new Hono();
const bookSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    author: z.string().min(1),
    publisher: z.string().min(1),
    category: z.string().min(1),
    quantity: z.number().min(1),
    isbn: z.string().min(1),
    publicationYear: z.number().min(1),
    stock: z.number().min(0).default(0),
    q: z.string().min(1),
});

app.get("/", authMiddleware, async (c) => {
    const getBooks = await db.select().from(books).all();
    return c.json({ "success": true, "data": getBooks });
});

app.get("/search", authMiddleware, zValidator("query", bookSchema.pick({ q: true })), async (c) => {
    const { q } = c.req.valid("query");
    const getBooksSearch = await db.select().from(books).where(like(books.title, `%${q}%`)).all();
    return c.json({ "success": true, "data": getBooksSearch });
});

app.get("/:id", authMiddleware, zValidator("param", bookSchema.pick({ id: true })), async (c) => {
    const { id } = c.req.valid("param");
    const getBooksId = await db.select().from(books).where(eq(books.id, id)).get();
    if (!getBooksId) {
        return c.json({ "success": false, "error":{ "message": "Book not found" , "code": "NOT_FOUND" } }, 404);
    }
    return c.json({ "success": true, "data": getBooksId });
});

app.post("/", authMiddleware, requireRole("ADMIN", "STAFF"), zValidator("json", bookSchema.omit({ q: true , id: true })), async (c) => {
    const { title, author, publisher, category, quantity, isbn, publicationYear, stock } = c.req.valid("json");
    const addBook = await db.insert(books).values({ id: crypto.randomUUID(), title, author, publisher, category, quantity, isbn, publicationYear, stock }).returning();
    return c.json({ "success": true, "data": addBook });
});

app.put("/:id", authMiddleware, requireRole("ADMIN", "STAFF"), zValidator("json", bookSchema.omit({ q: true , id: true })), zValidator("param", bookSchema.pick({ id: true })), async (c) => {
    const { title, author, publisher, category, quantity, isbn, publicationYear, stock } = c.req.valid("json");
    const { id } = c.req.valid("param");
    const getBooksId = await db.select().from(books).where(eq(books.id, id)).get();
    if (!getBooksId) {
        return c.json({ "success": false, "error":{ "message": "Book not found" , "code": "NOT_FOUND" } }, 404);
    }
    const updateBook = await db.update(books).set({ title, author, publisher, category, quantity, isbn, publicationYear, stock }).where(eq(books.id, id)).returning();
    return c.json({ "success": true, "data": updateBook });
});

app.delete("/:id",authMiddleware, requireRole("ADMIN"), zValidator("param", bookSchema.pick({ id: true })), async (c) => {
    const { id } = c.req.valid("param");
    const getBooksId = await db.select().from(books).where(eq(books.id, id)).get();
    if (!getBooksId) {
        return c.json({ "success": false, "error":{ "message": "Book not found" , "code": "NOT_FOUND" } }, 404);
    }   
    const deleteBook = await db.delete(books).where(eq(books.id, id)).returning();
    return c.json({ "success": true, "data": deleteBook });
});

export default app;