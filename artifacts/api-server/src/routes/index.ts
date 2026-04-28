import { Router, type IRouter } from "express";
import healthRouter from "./health";
import entriesRouter from "./entries";
import categoriesRouter from "./categories";

const router: IRouter = Router();

router.use(healthRouter);
router.use(entriesRouter);
router.use(categoriesRouter);

export default router;
