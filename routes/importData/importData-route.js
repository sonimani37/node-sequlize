var express = require("express");
const multer = require('multer');
const importDataController = require("../../controllers/importData/importDataController");

//Upload Files
const upload = multer({
    dest: 'documents',
})

var importDataRouter = express.Router();

importDataRouter.get("/2022-sheet",upload.single('sheetFile'), importDataController.processSheetData);

importDataRouter.get("/2021-sheet",upload.single('sheetFile'), importDataController.processSheetTwoData);

module.exports = importDataRouter;
