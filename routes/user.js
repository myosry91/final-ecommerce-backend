const {
  createUser,
  uploadUserImg,
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
} = require("../controllers/userController");
const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../validators/userValidator");
const router = require("express").Router();

router
  .route("/")
  .post(uploadUserImg, createUserValidator, createUser)
  .get(getAllUsers);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImg, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);
module.exports = router;
