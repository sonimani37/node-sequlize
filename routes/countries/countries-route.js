var express = require("express");
const countryController = require("../../controllers/countries/countriesController");

var countryRouter = express.Router();

countryRouter.get("/list", countryController.getAllCountries);

countryRouter.get("/with-years", countryController.countriesWithYear);

module.exports = countryRouter;
