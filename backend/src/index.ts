import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import app from "./routes/books";
import auth from "./routes/auth";
import rentals from "./routes/rentals";

const App = new Hono().use(cors());
App.route("/api/books", app);
App.route("/api/auth", auth);
App.route("/api/rentals", rentals);

serve({ fetch: App.fetch, port: 3000 });

