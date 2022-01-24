const multer = require("multer");
const { v4 } = require("uuid");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./static");
  },
  filename(req, file, cb) {
    cb(null, v4() + file.originalname);
  },
});

const types = ["image/png", "image/jpeg", "image/jpg"];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
