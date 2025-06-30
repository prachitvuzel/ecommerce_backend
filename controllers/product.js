import Product from "../model/product.js";

import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function handleProductAdd(req, res) {
  const { ProductName, brand, category, price, stockQuantity } = req.body;
  const filename = req.file.filename;
  await Product.create({
    ProductName,
    brand,
    category,
    price,
    productImageURL: `/productImages/${filename}`,
    createdBy: req.user._id,
    stockQuantity
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

async function productFiltering(req, res) {
    let ProductFilters = null
    if (req.params.category) {
        ProductFilters = await Product.find({ category: req.params.category })
    }
    else if(req.params.brand){
        ProductFilters = await Product.find({ brand: req.params.brand })
    }
    else {
        return res.json({msg:"InvalidfilterOptions"})
    }
    let productArray = []
    ProductFilters.map((product) => {
        let products = {}
        products.productName = product.ProductName
        products.price = product.price
        products.category = product.category
        products.brand = product.brand
        productArray.push(products)
    })
    return res.json(productArray)
}

export default { handleProductAdd, handleProductUpdate, handleProductDelete, productFiltering };
