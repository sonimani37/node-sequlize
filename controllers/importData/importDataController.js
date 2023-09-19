const Country = require("../../models").countries;
const Governances = require("../../models").governances;
const Developments = require("../../models").developments;
const Ultimates = require("../../models").ultimates;
const Taxonomies = require("../../models").taxonomies;
const Indicators = require("../../models").indicators;
const Questionnames = require("../../models").questionNames;
const Questions = require("../../models").questions;

const xlsx = require('xlsx');
const { Op } = require('sequelize'); // Import the Op (Operator) module

module.exports = {
    async processSheetData(req, resp) {
        try {
            const countryId = req.body.countryId;
            const uploadedFile = req.file;
            const year = req.body.year;
            if (!uploadedFile) {
                return resp.status(400).send('No file uploaded.');
            }
            const workbook = xlsx.readFile(uploadedFile.path);
            // for (const sheetName of workbook.SheetNames) {
            // console.log( workbook.SheetNames);
            for (const [index, sheetName] of workbook.SheetNames.entries()) {
                console.log('------------index-------', index);
                console.log('------------sheetName-------', sheetName);
                const governance_id = index == 0 ? 1 : 2;
                console.log('-------------------governance_id---------------------', governance_id);
                // if(index == 1){
                const sheet = workbook.Sheets[sheetName];
                const sheetData = xlsx.utils.sheet_to_json(sheet);
                await processSheet(sheetName, sheetData, governance_id, countryId, year, index);
                // }
            }
            resp.status(200).json('POST request received');
        } catch (error) {
            // return resp.send(error)
            return resp.status(500).json(error)
        }
    },

    async processSheetTwoData(req, resp) {
        try {
            const governanceId = req.body.governance_id;
            const uploadedFile = req.file;
            const year = req.body.year;
            console.log(governanceId);
            console.log(uploadedFile);
            console.log(year);
            if (!uploadedFile) {
                return resp.status(400).send('No file uploaded.');
            }
            const workbook = xlsx.readFile(uploadedFile.path);
            // console.log( workbook);
            console.log(workbook.SheetNames);
            for (const [index, sheetName] of workbook.SheetNames.entries()) {
                console.log('------------index-------', index);
                console.log('------------sheetName-------', sheetName);
                const sheet = workbook.Sheets[sheetName];
                const sheetData = xlsx.utils.sheet_to_json(sheet);
                await processSheetTwo(sheetName, sheetData, governanceId, year, index);
            }
            resp.send('POST request received');

        } catch (error) {
            console.log(error);
        }
    },
}

async function processSheet(sheetName, sheetData, governanceId, countryId, year, index) {
    allTaxonomy = [
        'Healthcare Governance', 'IT Governance', 'IT Workforce & Infrastructure',
        'Healthcare workforce and Infrastructure', 'AI Workforce/Infrastructure',
        'Digital Health (DH) Governance', 'DH Infrastructure', 'Workforce (Technical and Health care)',
        'Funding and resources', 'Legal rules', 'Research Program and funding',
        'Literacy (patient+ workforce)'
    ];

    for (let i = 0; i < sheetData.length; i++) {
        const data = sheetData[i];
        if (data.Ultimate != undefined) {
            const ultimateName = data?.Ultimate?.toLowerCase().trimEnd();
            var taxonomyName = data?.Taxonomy?.trimEnd();
            var taxonomyScore;
            if (typeof taxonomyName === 'string') {
                const taxoScoreMatch = taxonomyName?.match(/\((\d+)\)/);
                taxonomyScore = taxoScoreMatch ? parseInt(taxoScoreMatch[1]) : null;
            }
            var indicatorName = data.Indicators?.trimEnd();
            var indicatorScore;
            if (typeof indicatorName === 'string') {
                const indicScoreMatch = indicatorName?.match(/\((\d+)\)/);
                indicatorScore = indicScoreMatch ? parseInt(indicScoreMatch[1]) : null;
                const inputString = indicatorName;
                indicatorName = inputString.replace(/\(\d+\)/, "").trim();
            }
            var questionName = data.Questions?.trimEnd();
            var questionScore;
            if (typeof questionName === 'string') {
                const actualScoreMatch = questionName?.match(/\((\d+)\)/);
                questionScore = actualScoreMatch ? parseInt(actualScoreMatch[1]) : null;
                const inputString = questionName;
                questionName = inputString.replace(/\(\d+\)/, "").trim();
            }
            const actualScore = data['Actual Score'];
            const status = data.Status;
            const text = data.Text;
            const links = data.Links;
            try {
                const ultimateData = await Ultimates.findOne({
                    where: { ultimate_name: ultimateName },
                });
                var ultimate_id;
                var development_id;
                if (ultimateData) {
                    ultimate_id = ultimateData.dataValues.id;
                    development_id = ultimateData.dataValues.development_id;
                } else {
                    console.log('Ultimate not found');
                }
                var newTaxonomyName;
                const filteredTaxonomy = await allTaxonomy.filter((taxonomy) => taxonomyName.includes(taxonomy));
                if (filteredTaxonomy) {
                    newTaxonomyName = filteredTaxonomy[0];
                }
                if (newTaxonomyName != undefined) {
                    const taxonomyData = await Taxonomies.findOne({
                        where: { taxonomy_name: newTaxonomyName },
                    });
                    var taxonomy_id;
                    if (taxonomyData) {
                        taxonomy_id = taxonomyData.dataValues.id;
                    } else {
                        const taxo = await Taxonomies.create({
                            taxonomy_name: newTaxonomyName,
                            governance_id: governanceId,
                        });
                        taxonomy_id = taxo.dataValues.id;
                    }
                    const indicatorData = await Indicators.findOne({
                        where: { indicator_name: indicatorName },
                    });
                    var indicator_id;
                    if (indicatorData) {
                        indicator_id = indicatorData.dataValues.id;
                    } else {
                        const indic = await Indicators.create({
                            indicator_name: indicatorName,
                            indicator_score: indicatorScore,
                            taxonomy_id: taxonomy_id,
                        });
                        indicator_id = indic.dataValues.id;
                    }
                    if (index == 0 && i == 0) {
                        const questionCount = await Questions.count({
                            where: { country_id: countryId, years: year },
                        });
                        if (questionCount > 0) {
                            try {
                                await Questions.destroy({
                                    where: { country_id: countryId, years: year },
                                });
                            } catch (error) {
                                console.error('Error deleting questions:', error);
                            }
                        } else {
                            console.log(`Country ID ${countryId} does not exist in the question_table.`);
                        }
                    }
                    const questionNameData = await Questionnames.findOne({
                        where: { question_name: questionName },
                    });
                    var qname_id;
                    if (questionNameData) {
                        qname_id = questionNameData.dataValues.id;
                    } else {
                        const questName = await Questionnames.create({
                            question_name: questionName,
                        });
                        qname_id = questName.dataValues.id;
                    }
                    var question_id;
                    const quest = await Questions.create({
                        question_score: questionScore,
                        qname_id: qname_id,
                        country_id: countryId,
                        years: year,
                        governance_id: governanceId,
                        development_id: development_id,
                        ultimate_id: ultimate_id,
                        taxonomy_id: taxonomy_id,
                        indicator_id: indicator_id,
                        actual_score: actualScore,
                        status: status,
                        links: links,
                        text: text,
                    });
                    question_id = quest.dataValues.id;
                }
            } catch (error) {
                console.error('Error executing query', error);
            }
        }
    }
}

async function processSheetTwo(sheetName, sheetData, governanceId, year, index) {
    allTaxonomy = [
        'Healthcare Governance', 'IT Governance', 'IT Workforce & Infrastructure',
        'Healthcare workforce and Infrastructure', 'AI Workforce/Infrastructure',
        'Digital Health (DH) Governance', 'DH Infrastructure', 'Workforce (Technical and Health care)',
        'Funding and resources', 'Legal rules', 'Research Program and funding',
        'Literacy (patient+ workforce)'
    ];

    for (let i = 0; i < sheetData.length; i++) {
        const data = sheetData[i];
        if (data.Ultimate != undefined) {
            const ultimate_id = data?.Ultimate;
            var taxonomyName = data?.Taxonomy?.trimEnd();
            var taxonomyScore;
            if (typeof taxonomyName === 'string') {
                const taxoScoreMatch = taxonomyName?.match(/\((\d+)\)/);
                taxonomyScore = taxoScoreMatch ? parseInt(taxoScoreMatch[1]) : null;
            }
            var indicatorName = data.Indicators?.trimEnd();
            var indicatorScore;
            if (typeof indicatorName === 'string') {
                const indicScoreMatch = indicatorName?.match(/\((\d+)\)/);
                indicatorScore = indicScoreMatch ? parseInt(indicScoreMatch[1]) : null;
                const inputString = indicatorName;
                indicatorName = inputString.replace(/\(\d+\)/, "").trim();
            }
            var questionName = data.Questions?.trimEnd();
            var questionScore;
            if (typeof questionName === 'string') {
                const actualScoreMatch = questionName?.match(/\((\d+)\)/);
                questionScore = actualScoreMatch ? parseInt(actualScoreMatch[1]) : null;
                const inputString = questionName;
                questionName = inputString.replace(/\(\d+\)/, "").trim();
            }
            try {
                const ultimateData = await Ultimates.findOne({
                    where: { id: ultimate_id },
                });
                var development_id;
                if (ultimateData) {
                    development_id = ultimateData.dataValues.development_id;
                } else {
                    console.log('Ultimate not found');
                }
                var newTaxonomyName;
                const filteredTaxonomy = await allTaxonomy.filter((taxonomy) => taxonomyName.includes(taxonomy));
                if (filteredTaxonomy) {
                    newTaxonomyName = filteredTaxonomy[0];
                }
                if (newTaxonomyName != undefined) {
                    const taxonomyData = await Taxonomies.findOne({
                        where: { taxonomy_name: newTaxonomyName },
                    });
                    var taxonomy_id;
                    if (taxonomyData) {
                        taxonomy_id = taxonomyData.dataValues.id;
                    } else {
                        const taxo = await Taxonomies.create({
                            taxonomy_name: newTaxonomyName,
                            governance_id: governanceId,
                        });
                        taxonomy_id = taxo.dataValues.id;
                    }
                    const indicatorData = await Indicators.findOne({
                        where: { indicator_name: indicatorName },
                    });
                    var indicator_id;
                    if (indicatorData) {
                        indicator_id = indicatorData.dataValues.id;
                    } else {
                        const indic = await Indicators.create({
                            indicator_name: indicatorName,
                            indicator_score: indicatorScore,
                            taxonomy_id: taxonomy_id,
                        });
                        indicator_id = indic.dataValues.id;
                    }
                    if (index == 0 && i == 0) {
                        const questionCount = await Questions.count({
                            where: {
                                years: year,
                                ultimate_id: ultimate_id,
                                governance_id: governanceId
                            },
                        });
                        if (questionCount > 0) {
                            try {
                                await Questions.destroy({
                                    where: {
                                        years: year,
                                        ultimate_id: ultimate_id,
                                        governance_id: governanceId
                                    },
                                });
                            } catch (error) {
                                console.error('Error deleting questions:', error);
                            }
                        } else {
                            console.log(`Country ID ${countryId} does not exist in the question_table.`);
                        }
                    }
                    for (const [index, countryName] of Object.keys(data).entries()) {
                        if (countryName != 'Ultimate' && countryName != 'Taxonomy' && countryName != 'Indicators' && countryName != 'Questions') {
                            var actual_score = data[countryName];
                            const countryData = await Country.findOne({
                                where: { country_name: countryName },
                            });
                            var country_id
                            if (countryData) {
                                country_id = countryData.dataValues.id;
                            }
                            const questionNameData = await Questionnames.findOne({
                                where: { question_name: questionName },
                            });
                            var qname_id;
                            if (questionNameData) {
                                qname_id = questionNameData.dataValues.id;
                            } else {
                                const questName = await Questionnames.create({
                                    question_name: questionName,
                                });
                                qname_id = questName.dataValues.id;
                            }
                            var question_id;
                            const quest = await Questions.create({
                                question_score: questionScore,
                                qname_id: qname_id,
                                country_id: countryId,
                                years: year,
                                governance_id: governanceId,
                                development_id: development_id,
                                ultimate_id: ultimate_id,
                                taxonomy_id: taxonomy_id,
                                indicator_id: indicator_id,
                                actual_score: actual_score,
                            });
                            question_id = quest.dataValues.id;
                        }
                    }
                }
            } catch (error) {
                console.error('Error executing query', error);
            }
        }
    }
}



// async function processSheet(sheetName, sheetData, governanceId, countryId,year,index) {
//     console.log(index);
//     console.log(sheetName);
//     console.log(governanceId);
//     console.log(countryId);
//     console.log(year);
//     console.log(sheetData.length);
//     allTaxonomy = ['Healthcare Governance','IT Governance','IT Workforce & Infrastructure',
//         'Healthcare workforce and Infrastructure','AI Workforce/Infrastructure',
//         'Digital Health (DH) Governance','DH Infrastructure','Workforce (Technical and Health care)',
//         'Funding and resources','Legal rules','Research Program and funding',
//         'Literacy (patient+ workforce)'];

//     for (let i = 0; i < sheetData.length; i++) {
//         // if ( i < 2) {
//             console.log('---------------------------------------start---------------------------------------',i);
//             const data = sheetData[i];
//             if(data.Ultimate != undefined){
//                 console.log(data);
//                 const ultimateName = data?.Ultimate?.toLowerCase().trimEnd();
//                 var taxonomyName = data?.Taxonomy?.trimEnd();
//                 var taxonomyScore;
//                 if (typeof taxonomyName === 'string'){
//                     const taxoScoreMatch = taxonomyName?.match(/\((\d+)\)/);
//                     taxonomyScore = taxoScoreMatch ? parseInt(taxoScoreMatch[1]) : null;
//                 }
//                 var indicatorName = data.Indicators?.trimEnd();
//                 var indicatorScore;
//                 if (typeof indicatorName === 'string'){
//                     const indicScoreMatch = indicatorName?.match(/\((\d+)\)/);
//                     indicatorScore = indicScoreMatch ? parseInt(indicScoreMatch[1]) : null;

//                     const inputString = indicatorName;
//                     indicatorName = inputString.replace(/\(\d+\)/, "").trim();
//                 }
//                 var questionName = data.Questions?.trimEnd();
//                 var questionScore;
//                 if (typeof questionName === 'string'){
//                     const actualScoreMatch = questionName?.match(/\((\d+)\)/);
//                     questionScore = actualScoreMatch ? parseInt(actualScoreMatch[1]) : null;
//                     const inputString = questionName;
//                     questionName = inputString.replace(/\(\d+\)/, "").trim();
//                 }
//                 const actualScore =  data['Actual Score'];
//                 const status =  data.Status;
//                 const text =  data.Text;
//                 const links =  data.Links;
//                 try {
//                     const ultimateData = await Ultimates.findOne({
//                         where: { ultimate_name: ultimateName },
//                     });
//                     var ultimate_id;
//                     var development_id;
//                     if (ultimateData) {
//                         // console.log('----ultimateData----',ultimateData);
//                         ultimate_id = ultimateData.dataValues.id;
//                         development_id = ultimateData.dataValues.development_id;
//                         console.log('-------------development_id---------------------', development_id);
//                         console.log('-----------ultimate_id----------',ultimate_id,'-----------------');
//                     } else {
//                         console.log('Ultimate not found');
//                     }
//                     var newTaxonomyName;
//                         const filteredTaxonomy = await allTaxonomy.filter((taxonomy) => taxonomyName.includes(taxonomy) );
//                         if(filteredTaxonomy){
//                             newTaxonomyName = filteredTaxonomy[0];
//                         }
//                         if(newTaxonomyName != undefined){
//                             // console.log('new----- taxonomyName--------',newTaxonomyName)
//                             const taxonomyData = await Taxonomies.findOne({
//                                 where: { taxonomy_name: newTaxonomyName },
//                             });
//                             var taxonomy_id;
//                             if (taxonomyData) {
//                                 taxonomy_id = taxonomyData.dataValues.id;
//                             } else {
//                                 const taxo = await Taxonomies.create({
//                                     taxonomy_name: newTaxonomyName,
//                                     governance_id: governanceId,
//                                 });
//                                 taxonomy_id = taxo.dataValues.id;
//                             }
//                             console.log('----------------taxonomy_id----------',taxonomy_id,'-----------------');

//                              const indicatorData = await Indicators.findOne({
//                                 where: { indicator_name: indicatorName },
//                                 });
//                                 var indicator_id
//                                 if (indicatorData) {
//                                     indicator_id = indicatorData.dataValues.id;
//                                 } else {
//                                     const indic = await Indicators.create({
//                                         indicator_name: indicatorName,
//                                         indicator_score: indicatorScore,
//                                         taxonomy_id: taxonomy_id,
//                                     });
//                                     indicator_id = indic.dataValues.id;
//                                 }
//                             console.log('-----------indicator_id----------',indicator_id,'-----------------');

//                             console.log('----country_id---',parseInt(countryId));
//                             console.log('year-------',parseInt(year));

//                             if( index == 0 && i == 0){
//                                 console.log('-----------i------',index);
//                                 console.log('-----------i------',i);
//                                 const questionCount = await Questions.count({
//                                     where: { country_id: countryId, years: year },
//                                   });
//                                     console.log('questionCount---', questionCount);
//                                     if (questionCount > 0) {
//                                         console.log(`Country ID ${countryId} exists in the question_table.`);
//                                         try {
//                                             await Questions.destroy({
//                                               where: { country_id: countryId, years: year },
//                                             });
//                                             console.log('Questions deleted successfully.');
//                                           } catch (error) {
//                                             console.error('Error deleting questions:', error);
//                                           }
//                                     } else {
//                                         console.log(`Country ID ${countryId} does not exists in the question_table.`);
//                                     }
//                             }

//                             console.log('questionName--------------',questionName);
//                             const questionNameData = await Questionnames.findOne({
//                                       where: { question_name: questionName },
//                                 });
//                                 var qname_id;
//                                     if(questionNameData){
//                                         qname_id = questionNameData.dataValues.id;
//                                     }else{
//                                         const questName = await Questionnames.create({
//                                             question_name: questionName,
//                                         });
//                                         qname_id = questName.dataValues.id;
//                                     }
//                                     console.log('-------qname_id--------',qname_id,'-----------------');
//                                     var question_id;
//                                     const quest = await Questions.create({
//                                         question_score: questionScore,
//                                         qname_id: qname_id,
//                                         country_id: countryId,
//                                         years: year,
//                                         governance_id: governanceId,
//                                         development_id: development_id,
//                                         ultimate_id: ultimate_id,
//                                         taxonomy_id: taxonomy_id,
//                                         indicator_id: indicator_id,
//                                         actual_score: actualScore,
//                                         status: status,
//                                         links: links,
//                                         text: text,
//                                     });
//                                     question_id = quest.dataValues.id;
//                                     console.log('-------question_id--------',question_id,'-----------------');
//                         }
//                 }
//                 catch(error){
//                     console.error('Error executing query', error);
//                 }
//             }
//         // }
//     }
// }


// async function processSheetTwo(sheetName, sheetData, governanceId,year,index) {
//     console.log(index);
//     console.log(sheetName);
//     console.log(governanceId);
//     console.log(year);
//     console.log(sheetData.length);
//     allTaxonomy = ['Healthcare Governance','IT Governance','IT Workforce & Infrastructure',
//         'Healthcare workforce and Infrastructure','AI Workforce/Infrastructure',
//         'Digital Health (DH) Governance','DH Infrastructure','Workforce (Technical and Health care)',
//         'Funding and resources','Legal rules','Research Program and funding',
//         'Literacy (patient+ workforce)'];

//     for (let i = 0; i < sheetData.length; i++) {
//         // if ( i < 2) {
//             console.log('---------------------------------------start---------------------------------------',i);
//             const data = sheetData[i];
//             if(data.Ultimate != undefined){
//                 console.log(data);
//                 const ultimate_id = data?.Ultimate;
//                 var taxonomyName = data?.Taxonomy?.trimEnd();
//                 var taxonomyScore;
//                 if (typeof taxonomyName === 'string'){
//                     const taxoScoreMatch = taxonomyName?.match(/\((\d+)\)/);
//                     taxonomyScore = taxoScoreMatch ? parseInt(taxoScoreMatch[1]) : null;
//                 }
//                 var indicatorName = data.Indicators?.trimEnd();
//                 var indicatorScore;
//                 if (typeof indicatorName === 'string'){
//                     const indicScoreMatch = indicatorName?.match(/\((\d+)\)/);
//                     indicatorScore = indicScoreMatch ? parseInt(indicScoreMatch[1]) : null;

//                     const inputString = indicatorName;
//                     indicatorName = inputString.replace(/\(\d+\)/, "").trim();
//                 }
//                 var questionName = data.Questions?.trimEnd();
//                 var questionScore;
//                 if (typeof questionName === 'string'){
//                     const actualScoreMatch = questionName?.match(/\((\d+)\)/);
//                     questionScore = actualScoreMatch ? parseInt(actualScoreMatch[1]) : null;
//                     const inputString = questionName;
//                     questionName = inputString.replace(/\(\d+\)/, "").trim();
//                 }

//                 try {
//                     const ultimateData = await Ultimates.findOne({
//                         where: { id: ultimate_id },
//                     });
//                     var development_id;
//                     if (ultimateData) {
//                         development_id = ultimateData.dataValues.development_id;
//                         console.log('-------------development_id---------------------', development_id);
//                         console.log('-----------ultimate_id----------',ultimate_id,'-----------------');
//                     } else {
//                         console.log('Ultimate not found');
//                     }
//                     var newTaxonomyName;
//                         const filteredTaxonomy = await allTaxonomy.filter((taxonomy) => taxonomyName.includes(taxonomy) );
//                         if(filteredTaxonomy){
//                             newTaxonomyName = filteredTaxonomy[0];
//                         }
//                         if(newTaxonomyName != undefined){
//                             // console.log('new----- taxonomyName--------',newTaxonomyName)
//                             const taxonomyData = await Taxonomies.findOne({
//                                 where: { taxonomy_name: newTaxonomyName },
//                             });
//                             var taxonomy_id;
//                             if (taxonomyData) {
//                                 taxonomy_id = taxonomyData.dataValues.id;
//                             } else {
//                                 const taxo = await Taxonomies.create({
//                                     taxonomy_name: newTaxonomyName,
//                                     governance_id: governanceId,
//                                 });
//                                 taxonomy_id = taxo.dataValues.id;
//                             }
//                             console.log('----------------taxonomy_id----------',taxonomy_id,'-----------------');

//                              const indicatorData = await Indicators.findOne({
//                                 where: { indicator_name: indicatorName },
//                                 });
//                                 var indicator_id
//                                 if (indicatorData) {
//                                     indicator_id = indicatorData.dataValues.id;
//                                 } else {
//                                     const indic = await Indicators.create({
//                                         indicator_name: indicatorName,
//                                         indicator_score: indicatorScore,
//                                         taxonomy_id: taxonomy_id,
//                                     });
//                                     indicator_id = indic.dataValues.id;
//                                 }
//                             console.log('-----------indicator_id----------',indicator_id,'-----------------');

//                             console.log('----country_id---',parseInt(countryId));
//                             console.log('year-------',parseInt(year));

//                             if( index == 0 && i == 0){
//                                 console.log('-----------i------',index);
//                                 console.log('-----------i------',i);
//                                 const questionCount = await Questions.count({
//                                     where: {
//                                         years: year ,
//                                         ultimate_id: ultimate_id ,
//                                         governance_id: governanceId
//                                     },
//                                   });
//                                     console.log('questionCount---', questionCount);
//                                     if (questionCount > 0) {
//                                         console.log(`Country ID ${countryId} exists in the question_table.`);
//                                         try {
//                                             await Questions.destroy({
//                                               where: {
//                                                 years: year ,
//                                                 ultimate_id: ultimate_id ,
//                                                 governance_id: governanceId
//                                              },
//                                             });
//                                             console.log('Questions deleted successfully.');
//                                           } catch (error) {
//                                             console.error('Error deleting questions:', error);
//                                           }
//                                     } else {
//                                         console.log(`Country ID ${countryId} does not exists in the question_table.`);
//                                     }
//                             }

//                             for(const [index,countryName] of Object.keys(data).entries()){
//                                 if(countryName != 'Ultimate' && countryName != 'Taxonomy' && countryName != 'Indicators' && countryName != 'Questions'){
//                                     console.log('-----------------------country-indexxx----------------------------',index);
//                                     console.log('--------------------countryName--------------------',countryName);
//                                     var actual_score = data[countryName];

//                                     const countryData = await Country.findOne({
//                                         where: { country_name: countryName },
//                                         });
//                                         var country_id
//                                         if (countryData) {
//                                             country_id = countryData.dataValues.id;
//                                         }

//                                     console.log('----------countryId---------------------------------',countryId);
//                                     console.log('----------indicator_id------------------------------',indicator_id);
//                                     console.log('----------questionName------------------------------',questionName);
//                                     console.log('----------questionScore-----------------------------',questionScore);
//                                     console.log('----------actual_score------------------------------', actual_score);
//                                     console.log('----------taxonomy_id--------------------------------------',taxonomy_id);
//                                     console.log('----------year--------------------------=-------------------------',year);
//                                     console.log('----------ultimate_id--------------------------------------',ultimate_id);
//                                     console.log('----------governanceId--------------------------------------',governanceId);

//                                     console.log('questionName--------------',questionName);
//                                     const questionNameData = await Questionnames.findOne({
//                                             where: { question_name: questionName },
//                                         });
//                                         var qname_id;
//                                             if(questionNameData){
//                                                 qname_id = questionNameData.dataValues.id;
//                                             }else{
//                                                 const questName = await Questionnames.create({
//                                                     question_name: questionName,
//                                                 });
//                                                 qname_id = questName.dataValues.id;
//                                             }
//                                             console.log('-------qname_id--------',qname_id,'-----------------');
//                                             var question_id;
//                                             const quest = await Questions.create({
//                                                 question_score: questionScore,
//                                                 qname_id: qname_id,
//                                                 country_id: countryId,
//                                                 years: year,
//                                                 governance_id: governanceId,
//                                                 development_id: development_id,
//                                                 ultimate_id: ultimate_id,
//                                                 taxonomy_id: taxonomy_id,
//                                                 indicator_id: indicator_id,
//                                                 actual_score: actual_score,
//                                             });
//                                             question_id = quest.dataValues.id;
//                                             console.log('-------question_id--------',question_id,'-----------------');
//                                 }
//                             }



//                         }
//                 }
//                 catch(error){
//                     console.error('Error executing query', error);
//                 }
//             }
//         // }
//     }
// }
