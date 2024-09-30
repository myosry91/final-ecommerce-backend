const { createProduct, getAllProducts, uploadProductImages, getProduct, deleteProduct, updateProduct } = require("../controllers/productController")
const { createProductValidator, updateProductValidator, deleteProductValidator, getProductValidator } = require("../validators/productValidator")

const router = require("express").Router()

router.route("/").post(uploadProductImages,createProductValidator,createProduct)
                 .get(getAllProducts)
router.route("/:id").put(uploadProductImages,updateProductValidator,updateProduct) 
                    .delete(deleteProductValidator,deleteProduct)
                    .get(getProductValidator,getProduct)                

module.exports = router