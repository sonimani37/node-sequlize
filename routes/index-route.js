var express = require("express");
var router = express.Router();

const countryRouter = require('./countries/countries-route')

//main-route
router.get("/", (req, res) => {
    console.log('innnnnn');
    res.status(200).json({
        content: " Welcome 🙌 ",
        status: 200,
    });
});

router.use("/countries",countryRouter);

module.exports = router;
