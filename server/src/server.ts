import "dotenv/config";
import express from "express";
import { env } from "./utils/env.util.js";
import cors from "cors";
import { morganConsole, morganLogger } from "./utils/morgan.util.js";
import prisma from "./config/prisma.js";
import routes from "./routes/index.route.js";
import { handleError } from "./middlewares/error.middleware.js";
const app = express();
const PORT = env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors({ origin: "*" }));
app.use(morganConsole);
app.use(morganLogger);

app.use("/api", routes);
app.use(handleError);
app.use((req, res)=>{
  res.status(404)

  if(req.accepts('json') || req.url.startsWith("/api/")) {
      return res.json({
        status: 404,
        error: "Not found",
        message: `Not found ${req.originalUrl} on this server`
      })
  }

  res.type("text").send("404 not found")
})

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(
      "Prisma DB connected!",
      new Date().toLocaleString("sv-SE", { timeZone: "Asia/Bangkok" }),
    );
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
    console.log("prisma DB connection failed!");
    process.exit(1);
  }
});
