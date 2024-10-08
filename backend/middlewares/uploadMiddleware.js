import multer from "multer";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from "../config/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary : cloudinary,
  params : {
    folder : 'profilePictures',
    allowed_formats : ['jpeg', 'png', 'jpg'],
    public_id : (req, file) => `profile_${Date.now()}_${file.originalname}`
  }
});

const upload = multer({ storage });

export default upload