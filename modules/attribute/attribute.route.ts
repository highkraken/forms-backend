import { Router } from "express";
import { AttributeController } from "./attribute.controller";

const router = Router();

router.post("/", AttributeController.create);

router.get("/:id", AttributeController.findById);

router.put("/", AttributeController.update);

router.delete("/:id", AttributeController.delete);

export default router;
