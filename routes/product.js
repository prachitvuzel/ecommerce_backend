import express from "express";
const router = express.Router();
import Product from "../model/product.js";
import multer from "multer";
import path from "path";
import productControllers from "../controllers/product.js";
import middleware from "../middleware/authentication.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/productImages/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const allProducts = await Product.find();

  return res.json(allProducts);
});

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const product = await Product.findById(req.params.id).exec();
  return res.json(product);
});

router.post(
  "/addtoinventory",
  middleware.authenticateAdminAccess,
  upload.single("productImage"),
  productControllers.handleProductAdd
);

router.patch(
  "/updateproduct/:id",
  middleware.authenticateAdminAccess,
  upload.single("productImage"),
  productControllers.handleProductUpdate
);

router.delete(
  "/deleteproduct/:id",
  middleware.authenticateAdminAccess,
  productControllers.handleProductDelete
);

export default router;
