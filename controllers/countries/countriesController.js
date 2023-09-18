// const User = require("../../models").User;

const Country = require("../../models/countries");


module.export = {
    async getAllCountries(req,res){
        try {
            const countriesData = await Country.findAll();
            console.log('----------------countriesData--------',countriesData);
            let resp = {
                data:countriesData
            }
            return res.status(200).json(resp)
        } catch (error) {
            return res.status(500)(error)
        }
    }
}