const {
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImg,
  getBrand,
} = require("../controllers/brandController");
const express = require("express");
const { createBrandValidator, deleteBrandValidator, updateBrandValidator, getBrandValidator } = require("../validators/BrandValidator");
const router = express.Router();
// const multer = require("multer");

// const FILE_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpeg",
//   "image/jpg": "jpg",
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const isValid = FILE_TYPE_MAP[file.mimetype];
//     let uploadError = new Error("invalid image type");

//     if (isValid) {
//       uploadError = null;
//     }
//     cb(uploadError, "uploads/brands");
//   },
//   filename: function (req, file, cb) {
//     const fileName = file.originalname.split(" ").join("-");
//     const extension = FILE_TYPE_MAP[file.mimetype];
//     cb(null, `${fileName}-${Date.now()}.${extension}`);
//   },
// });

// const uploadOptions = multer({ storage: storage });

router
  .route("/")
  .get(getAllBrands)
  .post(uploadBrandImg, createBrandValidator,createBrand);
router
  .route("/:id")
  .get(getBrandValidator,getBrand)
  .put(uploadBrandImg, updateBrandValidator,updateBrand)
  .delete(deleteBrandValidator,deleteBrand);

module.exports = router;
