import multer from "multer";

export const fileValidation = {
  image: ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/webp"],
  video: ["video/mp4", "video/mkv", "video/avi", "video/mov"],
  pdf: ["application/pdf", "application/x-pdf"],
  //doc: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  excel: [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
};

function fileUpload(customValidation = []) {
  const storage = multer.diskStorage({});

  function fileFilter(req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("Invalid format", false);
    }
  }

  const upload = multer({ fileFilter, storage });
  return upload;
}

export default fileUpload;
