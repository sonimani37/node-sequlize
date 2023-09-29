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
            // console.log(req.body);
            // console.log(req.body.countries);
            // console.log(req.body.governance_id);
            // console.log(req.body.development_id);

            const payloadData = {
                country_id: req.body.countries,
                governance_id: req.body.governance_id
            }
            if (req.body.development_id) {
                payloadData.development_id = req.body.development_id;
            }
            // console.log(payloadData);
            const questions = await Questions.findAll({
                where: payloadData,
                include: [
                    {
                        model: Country,
                        as: 'countries',
                        attributes: ['id', 'country_name'],
                    },
                    {
                        model: Questionnames,
                        as: 'questionNames',
                        attributes: ['id', 'question_name'],
                    },
                    {
                        model: Indicators,
                        as: 'indicators',
                        attributes: ['id', 'indicator_name', 'indicator_score'],
                        group: ['indicator_id', 'indicator_name', 'indicator_score'] //
                    },
                    {
                        model: Taxonomies,
                        as: 'taxonomies',
                        attributes: ['id', 'taxonomy_name', 'governance_id'],
                    },
                    {
                        model: Ultimates,
                        as: 'ultimates',
                        attributes: ['id', 'ultimate_name'],
                    },
                    {
                        model: Developments,
                        as: 'developments',
                        attributes: ['id', 'development_name'],
                    },
                ]
            })

            let res = nestGroupsBy(questions, ['governance_id']);
            resp.status(200).json(res);
        } catch (error) {
            return resp.status(500).json(error)
        }
    },
}

function nestGroupsBy(arr, properties) {
    // console.log(arr);
    // console.log(properties);
    properties = Array.from(properties);

    if (properties.length === 1) {
        let resp = groupBy(arr, properties[0]);
        return groupBy(arr, properties[0]);
    }
    const property = properties.shift();
    // console.log(properties);

    var grouped = groupBy(arr, property);
    // console.log('grouped');
    for (let key in grouped) {
        grouped[properties] = nestGroupsBy(grouped[key], Array.from(properties));
    }
    return grouped;
}

function groupBy(conversions, property) {

    return conversions.reduce((acc, obj) => {
        let key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        console.log(property);
        acc[key].push(obj);
        return acc;
    }, {});
}


// function transformData(data) {
//     // console.log('data',data);
//     console.log('data.length', data.length);
//     // Initialize the result object
//     const result = {};

//     // Iterate through the sample data
//     data.forEach((entry, index) => {
//         console.log('------index------', index);
//         console.log('-----data-----', data);
//         const developmentName = entry.developments.development_name;
//         const ultimateName = entry.ultimates.ultimate_name;
//         const taxonomyName = entry.taxonomies.taxonomy_name;
//         const indicatorName = entry.indicators.indicator_name;
//         const questionName = entry.questionNames.question_name;

//         // Create the nested structure as needed
//         if (!result[developmentName]) {
//             result[developmentName] = {};
//         }
//         if (!result[developmentName][ultimateName]) {
//             result[developmentName][ultimateName] = {};
//         }
//         if (!result[developmentName][ultimateName][taxonomyName]) {
//             result[developmentName][ultimateName][taxonomyName] = {};
//         }
//         if (!result[developmentName][ultimateName][taxonomyName][indicatorName]) {
//             result[developmentName][ultimateName][taxonomyName][indicatorName] = {};
//         }

//         // Create the final data entry
//         const dataEntry = {
//             "c_id": entry.countries.id,
//             "c_name": entry.countries.country_name,
//             "developement_id": entry.developments.id,
//             "development_name": developmentName,
//             "ultimate_id": entry.ultimates.id,
//             "ultimate_name": ultimateName,
//             "country_id": entry.country_id,
//             "taxonomy_id": entry.taxonomy_id,
//             "taxonomy_name": taxonomyName,
//             "indicator_id": entry.indicator_id,
//             "indicator_name": indicatorName,
//             "indicator_score": entry.indicators.indicator_score,
//             "question": entry.question,
//             "question_order": entry.question_order,
//             "question_id": entry.question_id,
//             "question_name": questionName,
//             "question_score": entry.question_score,
//             "status": entry.status,
//             "ststus": entry.ststus, // Typo in your example
//             "actual_score": entry.actual_score
//         };
//         // Add the data entry to the result
//         result[developmentName][ultimateName][taxonomyName][indicatorName][questionName] = [dataEntry];
//     });

//     console.log('result', result);
//     return result;


// }
