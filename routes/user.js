const { createUser, uploadUserImg } = require("../controllers/userController");
const { createUserValidator } = require("../validators/userValidator");
const router = require("express").Router();

router.route("/").post(uploadUserImg,createUserValidator,createUser)

module.exports = router