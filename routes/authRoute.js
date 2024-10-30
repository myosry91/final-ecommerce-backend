const express = require("express")
const { signupValidator, loginValidator } = require("../validators/authValidator")
const { signup, login,logoutCtrl,getCurrentUserCtrl } = require("../controllers/authController")
const { allowedTo, authentication } = require("../middlewares/authMiddleware");


const router = express.Router()
router.route("/signup").post(signupValidator,signup)
router.route("/login").post(loginValidator,login)
router.route("/logout").post(logoutCtrl);
router.route("/currentUser").get(authentication,getCurrentUserCtrl);

module.exports = router