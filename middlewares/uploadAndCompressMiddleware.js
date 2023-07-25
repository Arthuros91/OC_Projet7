const multer = require("multer");
const sharp = require("sharp");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadAndCompressMiddleware = (req, res, next) => {
    upload.single("image")(req, res, async (err) => {
        try {
            if (err) {
                console.error("Erreur lors de la compression et de l'enregistrement de l'image : ", err); 
                return res.status(500).json({ message: "Erreur lors du téléchargement de l'image.", err });
            }

            const format = MIME_TYPES[req.file.mimetype];
            console.log("Mimetype du fichier téléchargé : ", format);
            if (!format) {
                return res.status(401).json({ message: "Type non pris en charge" });
            }

            const compressedImage = await sharp(req.file.buffer)
                .toFormat(format, { quality: 60 })
                .toBuffer();

            const fileName = req.file.originalname.split(" ").join("_").split(".")[0];
            const compressedFileName = `${fileName}-${Date.now()}.${format}`;
            const imagePath = `images/${compressedFileName}`;

            await sharp(compressedImage).toFile(imagePath);
            req.file.path = imagePath;
            next();

        } catch (err) {
            return res.status(500).json({ message: "Erreur lors de la compression et de l'enregistrement de l'image.",err });
        }
    });
};

module.exports = uploadAndCompressMiddleware;