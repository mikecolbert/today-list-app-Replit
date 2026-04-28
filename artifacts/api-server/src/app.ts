import path from "path";
import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// When SERVE_STATIC=true the server also hosts the built React frontend.
// Set this on Azure App Service (or any single-process deployment).
// The frontend must be built first: pnpm --filter @workspace/today-list run build
if (process.env.SERVE_STATIC === "true") {
  // __dirname is injected by the esbuild build banner so it always points to
  // the compiled server's directory (artifacts/api-server/dist/).
  const staticDir =
    process.env.STATIC_DIR ??
    path.resolve(__dirname, "../../today-list/dist/public");

  logger.info({ staticDir }, "Serving static frontend files");

  app.use(express.static(staticDir));

  // SPA catch-all: any request that doesn't match /api or a static file
  // gets index.html so the React router can handle it client-side.
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });
}

export default app;
