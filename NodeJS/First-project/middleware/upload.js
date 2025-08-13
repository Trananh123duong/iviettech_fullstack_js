// file: middlewares/upload.middleware.js
const multer = require('multer');
const path = require('path'); // Module có sẵn của NodeJS

// Cấu hình nơi lưu trữ và tên file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Tạo một thư mục 'uploads' ở thư mục gốc nếu chưa có
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Tạo một tên file duy nhất để tránh bị trùng lặp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Cấu hình Multer hoàn chỉnh
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Giới hạn kích thước file là 5MB
  },
  fileFilter: (req, file, cb) => {
    // Chỉ cho phép upload các loại ảnh phổ biến
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Lỗi: Chỉ cho phép upload file ảnh!'));
  }
});

module.exports = upload;
