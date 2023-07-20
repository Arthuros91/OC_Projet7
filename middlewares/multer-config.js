const multer = require("multer");
const sharp = require("sharp");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

const storage = multer.memoryStorage(); // Utilisez memoryStorage pour stocker temporairement l'image en mémoire
const upload = multer({ storage: storage });

const uploadAndCompressMiddleware = (req, res, next) => {
    upload.single("image")(req, res, async (err) => { 
        try {
            const format = MIME_TYPES[req.file.mimetype];
            if (!format) {
                return res.status(401).json({message: "Type non pris en charge"});
            }
            const compressedImage = await sharp(req.file.buffer)
                .toFormat(format, { quality: 60 })
                .toBuffer();

            const fileName = req.file.originalname.split(" ").join("_").split(".")[0];
            const compressedFileName = `${fileName}-${Date.now()}.${format}`;
            const imagePath = `images/${compressedFileName}`;
            await sharp(compressedImage).toFile(imagePath);

            next();
        } catch (err) {
            return next(err);
    }
    });
};

module.exports = uploadAndCompressMiddleware;