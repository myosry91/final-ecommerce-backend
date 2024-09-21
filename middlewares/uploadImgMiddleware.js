const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/ApiError');
exports.uploadSingleImg = (fieldName,folderName,name) => {
   console.log(folderName,fieldName);
   
    const multerStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`);
        },
        filename: function (req, file, cb) {
            // user-${id}-Date.now()-extension
            const ext = file.mimetype.split("/")[1]
            const fileName = `${name}-${uuidv4()}-${Date.now()}.${ext}`;
            cb(null, fileName)
        }
    })

    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true)
        }
        else {
            cb(new ApiError("Only Images allowed", 400), false)
        }
    }
    const upload = multer({ storage: multerStorage, fileFilter })
    return upload.single(fieldName)
}

