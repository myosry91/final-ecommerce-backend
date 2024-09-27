const { uploadSingleImg } = require("../middlewares/uploadImgMiddleware");
const { Brand } = require("../models/brand");
const asyncWrapper = require("../utils/asyncWrapper");
const ApiError = require("../utils/ApiError");

// Get all the brands
exports.getAllBrands = asyncWrapper(async (req, res, next) => {
  const brandList = await Brand.find();

  if (!brandList) return next(new ApiError("Server error", 500));
  res.status(200).send(brandList);
});

// Get the brand by id
exports.getSingleBrand = asyncWrapper(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand)
    return next(
      new ApiError("The brand with the given ID was not found.", 500)
    );
  res.status(200).send(brand);
});

// Add the brand
exports.createBrand = asyncWrapper(async (req, res, next) => {
  const file = req.file;
  if (!file) return next(new ApiError("No image in the request", 400));

  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/uploads/brands/`;

  let brand = new Brand({
    name: req.body.name,
    logo: `${basePath}${fileName}`,
  });
  brand = await brand.save();

  if (!brand) return next(new ApiError("the brand cannot be created!", 400));

  res.send(brand);
});

// Update the brand by id
exports.updateBrand = asyncWrapper(async (req, res, next) => {
  const file = req.file;

  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return next(new ApiError("Brand not found", 404));
  }

  let logoPath = brand.logo;
  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/brands/`;
    logoPath = `${basePath}${fileName}`;
  }

  const updatedBrand = await Brand.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      logo: logoPath,
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedBrand,
  });
});

// Delete the brand by id
exports.deleteBrand = asyncWrapper(async (req, res, next) => {
  Brand.findByIdAndDelete(req.params.id)
    .then((brand) => {
      if (brand) {
        return res
          .status(200)
          .json({ success: true, message: "The Brand is deleted!" });
      } else {
        return next(new ApiError("Brand not found!", 404));
      }
    })
    .catch((err) => {
      return next(new ApiError(err, 500));
    });
});
