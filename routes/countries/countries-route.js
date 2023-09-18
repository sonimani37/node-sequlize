var express = require("express");
const countryController = require("../../controllers/countries/countriesController");

var countryRouter = express.Router();

countryRouter.get("/", countryController.getAllCountries);

module.exports = countryRouter;
