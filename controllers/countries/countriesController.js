const Country = require("../../models").countries;
const { Op } = require('sequelize'); // Import the Op (Operator) module

module.exports = {
    async getAllCountries(req,resp){
        try {
            const countriesData = await Country.findAll();
            let data = {
                response:countriesData
            }
            // return resp.send(resp)
            return resp.status(200).json(data)
        } catch (error) {
            // return resp.send(error)
            return resp.status(500).json(error)
        }
    },

    async countriesWithYear (req, resp){
        try{
            let countries_id = req.body.countries;
            const countriesData = await Country.findAll({
                where: {
                id: {
                        [Op.in]: countries_id, // Used the "in" operator to match multiple IDs
                    },
                },
            });
            let data = {
                response:countriesData
            }
            return resp.status(200).json(data)
        }catch(error){
            resp.send(error);
        }
    }

}
