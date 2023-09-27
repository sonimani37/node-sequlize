const Country = require("../../models").countries;
const Governances = require("../../models").governances;
const Developments = require("../../models").developments;
const Ultimates = require("../../models").ultimates;
const Taxonomies = require("../../models").taxonomies;
const Indicators = require("../../models").indicators;
const Questionnames = require("../../models").questionNames;
const Questions = require("../../models").questions;

const { Op } = require('sequelize'); // Import the Op (Operator) module

module.exports = {
    async viewData(req, resp) {
        try {
            console.log(req.body);
            console.log(req.body.countries);
            console.log(req.body.governance_id);

            const questions = await Questions.findAll({
                where: {
                    country_id : req.body.countries,
                    governance_id : req.body.governance_id
                },
                include: [
                    {
                        model: Country,
                        as: 'countries', // This should match the alias you set in the association
                        attributes: ['id','country_name'],
                    },
                    {
                      model: Questionnames,
                      as: 'questionNames', // This should match the alias you set in the association
                      attributes: ['id','question_name'],
                    },
                    {
                        model: Indicators, // Use the imported Indicators model
                        as: 'indicators', // This should match the alias you set in the association
                        attributes: ['id','indicator_name', 'indicator_score'], // Specify the columns you want to include
                        group: ['indicator_id', 'indicator_name', 'indicator_score'] //
                    },
                    {
                        model: Taxonomies, // Use the imported Indicators model
                        as: 'taxonomies', // This should match the alias you set in the association
                        attributes: ['id','taxonomy_name', 'governance_id'], // Specify the columns you want to include
                    },
                    {
                        model: Ultimates, // Use the imported Indicators model
                        as: 'ultimates', // This should match the alias you set in the association
                        attributes: ['id','ultimate_name'], // Specify the columns you want to include
                    },
                    {
                        model: Developments, // Use the imported Indicators model
                        as: 'developments', // This should match the alias you set in the association
                        attributes: ['id','development_name'], // Specify the columns you want to include
                    },
                ],
                group: [
                  'developments.id',
                  'developments.development_name',
                  'ultimates.id',
                  'ultimates.ultimate_name',
                  'countries.id',
                  'countries.country_name',
                  'taxonomies.id',
                  'taxonomies.taxonomy_name',
                  'indicators.id',
                  'indicators.indicator_name',
                  'indicators.indicator_score',
                  'questions.id',
                  'questions.status',
                  'questions.actual_score',
                  'questionNames.question_name',
                ],
            })
            //   const transformedData = transformData(questions);
            //   console.log('transformedData---------',(transformedData));
              console.log('questions---------',(questions.length));
            resp.status(200).json(questions);
        } catch (error) {
            // return resp.send(error)
            return resp.status(500).json(error)
        }
    },
}


function transformData(data) {
    console.log('data.length',data.length);
    console.log('data',data);
    const result = {};

    // data.forEach((entry,index) => {
    //     // if(index < 2){
    //         console.log(entry);
    //         const developmentName = entry.development_name;
    //         const ultimateName = entry.ultimate_name;
    //         const taxonomyName = entry.taxonomy_name;
    //         const indicatorName = entry.indicator_name;
    //         const questionName = entry.question_name;

    //        // Check if developmentName exists in result, if not, create it
    //         if (!result[developmentName]) {
    //             result[developmentName] = {};
    //             // console.log('----1result---',result);
    //         }

    //         // Check if ultimateName exists within developmentName, if not, create it
    //         if (!result[developmentName][ultimateName]) {
    //             result[developmentName][ultimateName] = {};
    //             // console.log('-------2result----',result);
    //         }

    //         // Check if taxonomyName exists within ultimateName, if not, create it
    //         if (!result[developmentName][ultimateName][taxonomyName]) {
    //             result[developmentName][ultimateName][taxonomyName] = {};
    //             // console.log('------3result----',result);
    //         }

    //         // Check if indicatorName exists within taxonomyName, if not, create it
    //         if (!result[developmentName][ultimateName][taxonomyName][indicatorName]) {
    //             result[developmentName][ultimateName][taxonomyName][indicatorName] = {};
    //             // console.log('---------4result-----',result[developmentName][ultimateName][taxonomyName][indicatorName]);
    //             // console.log('---------4result-----',result);
    //         }

    //          // Create a new entry under questionName with the desired properties
    //         result[developmentName][ultimateName][taxonomyName][indicatorName][questionName] = {
    //             "c_id": entry.country_id,
    //             "c_name": entry.country_name,
    //             "developement_id": entry.development_id,
    //             "development_name": developmentName,
    //             "ultimate_id": entry.ultimate_id,
    //             "ultimate_name": ultimateName,
    //             "country_id": entry.country_id,
    //             "country_name": entry.country_name,
    //             "taxonomy_id": entry.taxonomy_id,
    //             "taxonomy_name": taxonomyName,
    //             "indicator_id": entry.indicator_id,
    //             "indicator_name": indicatorName,
    //             "indicator_score": entry.indicator_score,
    //             "question_id": entry.question_id,
    //             "question_name": questionName,
    //             "question_score": entry.question_score,
    //             "status": entry.status,
    //             "actual_score": entry.actual_score
    //         };
    //         console.log('---------5result-----',result);
    //     // }
    // });

    return result;
}
