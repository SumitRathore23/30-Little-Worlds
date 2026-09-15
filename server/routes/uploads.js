const express = require("express");
const streamifier = require("streamifier");

const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/*
 * POST /api/uploads/image
 * Admin-only image upload
 */
router.post(
  "/image",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please select an image.",
        });
      }

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "30-little-worlds/covers",
            resource_type: "image",

            transformation: [
              {
                quality: "auto",
                fetch_format: "auto",
              },
            ],
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);
      });

      return res.status(201).json({
        success: true,
        message: "Image uploaded successfully.",
        image: {
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
        },
      });
    } catch (error) {
      console.error("Image upload error:", error);

      return res.status(500).json({
        success: false,
        message: "Image upload failed.",
      });
    }
  }
);

module.exports = router;