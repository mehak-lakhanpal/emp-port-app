const multer = require('multer');
const path = require('path');

const maxSize = 1 * 1000 * 1000; 

const upload = (file) => {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '..', 'uploads', 'images'))
        },
        filename: function (req, file, cb) {
            let ext = '';
            if(file.originalname.split('.').length >1 ){
                ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
            }
            cb(null, file.originalname.substr(0,file.originalname.lastIndexOf('.')) + '-' + Date.now() + ext)
        }
    })
    return multer({ 
      storage: storage,
      limits: { fileSize: maxSize }, 
      fileFilter: imageFileFilter 
    }).single(file);
}

const imageFileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("File format should be PNG,JPG,JPEG"), false); // if validation failed then generate error
    }
  };
module.exports = {
    upload
}