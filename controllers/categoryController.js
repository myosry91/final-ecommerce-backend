const { uploadSingleImg } = require("../middlewares/uploadImgMiddleware");
const { Category } = require("../models/category");
const asyncWrapper = require("../utils/asyncWrapper");
const ApiError = require("../utils/ApiError");

// upload single image
// exports.uploadCategoryImg = uploadSingleImg(
//   "categoryImg",
//   "categories",
//   "category"
// );

// Get all the categories
exports.getAllCategories = asyncWrapper(async (req, res, next) => {
  const categoryList = await Category.find();

  if (!categoryList) return next(new ApiError("Server error", 500));
  res.status(200).send(categoryList);
});

// Get the category by id
exports.getSingleCategory = asyncWrapper(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return next(
      new ApiError("The category with the given ID was not found.", 500)
    );
  res.status(200).send(category);
});

// Add the category
exports.createCategory = asyncWrapper(async (req, res) => {
  const file = req.file;
  if (!file) return next(new ApiError("No image in the request", 400));

  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/uploads/categories.js`;

  let category = new Category({
    name: req.body.name,
    image: `${basePath}${fileName}`,
  });
  category = await category.save();

  if (!category)
    return next(new ApiError("the category cannot be created!", 400));

  res.send(category);
});

// Update the category by id
exports.updateCategory = asyncWrapper(async (req, res, next) => {
  const file = req.file;

  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ApiError("Category not found", 404));
  }

  let imagePath = category.image;
  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/categories/`;
    imagePath = `${basePath}${fileName}`;
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      image: imagePath, 
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedCategory,
  });
});


// Delete the category by id
exports.deleteCategory = asyncWrapper(async (req, res, next) => {
  Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "The category is deleted!" });
      } else {
        return next(new ApiError("Category not found!", 404));
      }
    })
    .catch((err) => {
      return next(new ApiError(err, 500));
    });
});
