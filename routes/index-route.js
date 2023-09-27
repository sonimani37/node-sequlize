var express = require("express");
var router = express.Router();

const countryRouter = require('./countries/countries-route');
const importDataRouter = require('./importData/importData-route');
const fetchDataRouter = require('../routes/fetchData/fetchData-route')

router.get("/", (req, res) => {
    res.status(200).json({
        content: " Welcome",
        status: 200,
    });
});

//countries
router.use("/countries",countryRouter);

//import Data
router.use("/importData",importDataRouter);

//view Data
router.use("/view-data",fetchDataRouter)

module.exports = router;


