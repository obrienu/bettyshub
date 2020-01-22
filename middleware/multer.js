const multer = require("multer");
const path = require("path");

function checkFileType(file, callback) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extension = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extension) {
    return callback(null, true);
  } else {
    return callback("Error: Images Only !");
  }
}

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png"
};

const storageFabric = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/images/fabric/");
  },
  filename: (req, file, callback) => {
    const name = file.originalname
      .split(" ")
      .join("_")
      .substring(0, file.originalname.lastIndexOf("."));
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  }
});
const storageAccessories = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/images/accessories/");
  },
  filename: (req, file, callback) => {
    const name = file.originalname
      .split(" ")
      .join("_")
      .substring(0, file.originalname.lastIndexOf("."));
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  }
});

exports.fabric = multer({
  storage: storageFabric,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
  }
}).array("files");

exports.accessories = multer({
  storage: storageAccessories,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
  }
}).array("files");
