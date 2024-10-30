const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncWrapper = require("../utils/asyncWrapper")
const ApiError = require("../utils/ApiError")

const createToken = (payload)=>{
     return jwt.sign({userId:payload} , process.env.JWT_SECRET_KEY , {expiresIn:process.env.JWT_EXPIRE_TIME})
    
}
exports.signup = asyncWrapper(async(req,res , next)=>{

    const user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    })
    // const token = createToken(user._id)
    return res.status(201).json({data : user})
}) 
 

exports.login = asyncWrapper(async(req,res,next)=>{
    const user = await User.findOne({email : req.body.email})    
    if (!user) {
        return next(new ApiError('Incorrect Email or Password', 401));
    }
    const isMatch = await bcrypt.compare(req.body.password,user.password)

    if(!isMatch) return next(new ApiError(process.env.INVALID_CREDENTIALS,401))
    const token =  createToken(user._id)
    res.cookie("access_token", `Bearer ${token}`, {
        httpOnly: true, // Ensures the cookie is not accessible by JavaScript
        // secure: false, // Only set to true in production (HTTPS)
        // sameSite: "None", // Required for cross-site cookies (e.g., different domain or ports)
        withCredentials: true, // Include cookies in requests
        // maxAge: 7 * 24 * 60 * 60 * 1000, // Set cookie expiration time (1 week)
    });
    return res.status(200).json({data : user})

})

exports.logoutCtrl = asyncWrapper(async (req, res) => {
    res.clearCookie("access_token");
    res.send({ success: true });
}),

exports.getCurrentUserCtrl= asyncWrapper(async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) return res.status(404).json({ success: false, error: "user not found." })
    res.status(200).json({ success: true, data: user });
})