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

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images");
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

module.exports = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
  }
}).array("files");
