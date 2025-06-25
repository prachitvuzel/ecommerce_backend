import Product from "../model/product.js"

async function handleProductAdd(req, res) {
    const { ProductName, brand, category, price } = req.body
    const filename = req.file.filename
    await Product.create({
        ProductName,
        brand,
        category,
        price,
        profileImageURL: `/productImages/${filename}`,
        createdBy:req.user._id
    })

    return res.json({msg:"Product successfully added"})
    
}


export default {handleProductAdd}