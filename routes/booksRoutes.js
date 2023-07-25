const express = require("express");

const bookCtrl = require("../controllers/book");

const auth = require("../middlewares/auth")
const uploadAndCompressMiddleware = require("../middlewares/uploadAndCompressMiddleware");

const router = express.Router();



router.get("/", bookCtrl.getAllBooks);
router.get("/bestrating", bookCtrl.getBestRating);
router.get("/:id", bookCtrl.getOneBook);

router.post("/", auth, uploadAndCompressMiddleware, bookCtrl.createBook);
router.post("/:id/rating", auth, bookCtrl.rateBook);

router.put("/:id", auth, uploadAndCompressMiddleware, bookCtrl.modifyBook);

router.delete("/:id", auth, bookCtrl.deleteBook);



module.exports = router;