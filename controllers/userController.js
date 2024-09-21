const { uploadSingleImg } = require("../middlewares/uploadImgMiddleware");
const User = require("../models/user");
const asyncWrapper = require("../utils/asyncWrapper");

// upload single image
exports.uploadUserImg = uploadSingleImg("profileImg","users","user                                                                  ");

exports.createUser = asyncWrapper(async (req, res) => {
  if(req.file){
    console.log(req.file);
    req.body.profileImg = req.file.filename
    
  }
  const user = await User.create(req.body); 
  res.status(201).json({
    data: user
  });
});
