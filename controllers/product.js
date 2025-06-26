import Product from "../model/product.js";

import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function handleProductAdd(req, res) {
  const { ProductName, brand, category, price } = req.body;
  const filename = req.file.filename;
  await Product.create({
    ProductName,
    brand,
    category,
    price,
    productImageURL: `/productImages/${filename}`,
    createdBy: req.user._id,
  });

  return res.json({ msg: "Product successfully added" });
}

async function handleProductUpdate(req, res) {
  const body = req.body;
  const newfilename = req.file.filename;
  const product = await Product.findById(req.params.id);
  const previousImageURL = product.productImageURL;
  const new_body = { ...body, productImageURL: `productImages/${newfilename}` };
  const product_desc = ["ProductName", "category", "brand", "price"];

  for (let entry in body) {
    // console.log(product_desc.includes(entry))
    if (!product_desc.includes(entry)) {
      return res.json({ msg: "Invalid product description" });
    }
  }

  await Product.findOneAndUpdate({ _id: req.params.id }, new_body);

  //deleting previous imagfiles
  fs.unlink(`${process.env.BASE_PATH}/public/${previousImageURL}`, (err) => {
    if (err) throw err;
    console.log("path/file.txt was deleted");
  });

  return res.json({ msg: "product successfully updated" });
}

async function handleProductDelete(req, res) {
  await Product.findByIdAndDelete(req.params.id);

  return res.json({ msg: "product successfully deleted" });
}

export default { handleProductAdd, handleProductUpdate, handleProductDelete };
