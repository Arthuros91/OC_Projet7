const express = require("express");

const bookCtrl = require("../controllers/book");
const auth = require("../middlewares/auth")

const router = express.Router();



router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getOneBook);
router.get("/bestrating", bookCtrl.getBestRating);

router.post("/", bookCtrl.createBook);
router.post("/:id/rating", bookCtrl.rateBook);

router.put("/:id", bookCtrl.modifyBook);

router.delete("/:id", bookCtrl.deleteBook);



module.exports = router;