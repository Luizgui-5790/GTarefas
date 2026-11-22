import { Router } from "express";
import routerUser from "./userRoutes.js";

const router = Router();

router.use(routerUser);

export default router;
