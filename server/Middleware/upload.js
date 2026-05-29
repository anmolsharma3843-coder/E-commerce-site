import multer from "multer";
import path from "path";

/* =========================
   PROFILE IMAGE STORAGE
========================= */

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      "profile-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

export const uploadProfile = multer({
  storage: profileStorage,
});

/* =========================
   PRODUCT IMAGE STORAGE
========================= */

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      "product-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

export const uploadProduct = multer({
  storage: productStorage,
});