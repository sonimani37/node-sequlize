var express = require("express");

const fetchDataController = require("../../controllers/fetchData/fetchDataController");
var fetchDataRouter = express.Router();

fetchDataRouter.get("/", fetchDataController.viewData);

module.exports = fetchDataRouter;
