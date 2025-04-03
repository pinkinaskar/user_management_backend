const multer = require("multer");
const fs = require("fs");
const { Constants } = require('../config/constant'); 

const UploadLib = (imagesDir = null)  => {   

    if(!imagesDir)
        imagesDir = "./uploads";

    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
    }

    const imageStorageEngine = multer.diskStorage({
        
       
        destination: (req, file, cb) => {
            cb(null, imagesDir);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname.split(' ').join('-'));
        },
    });
    return multer({ storage: imageStorageEngine,  fileFilter: (req, file, cb) => {
        // Check if the file's MIME type is allowed
        if (Constants.allowImageMimeType.includes(file.mimetype)) {
          cb(null, true);  // Allow the file
        } else {
          cb(new Error('Invalid file type. Only jpg, jpeg, and png are allowed.'), false);  // Reject the file
        }
      }, });

}

module.exports = UploadLib;