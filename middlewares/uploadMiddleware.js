import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

// console.log("Inside multer middleware");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "resources", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Allow only image formats
  },
});

const upload = multer({ storage });

export default upload;
