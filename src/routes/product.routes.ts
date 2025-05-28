import express from "express";

import ProductController from "../controllers/product.controller";
import upload from "../middlewares/upload.middleware";
import { ctrlWrapper } from "../utils";

const router = express.Router();

router.get("/", ctrlWrapper(ProductController.getProducts));
router.post("/", upload.single("image"), ctrlWrapper(ProductController.createProduct));
router.delete("/:id", ctrlWrapper(ProductController.deleteProduct));
router.put("/:id", upload.single("image"), ctrlWrapper(ProductController.updateProduct));

export default router;
