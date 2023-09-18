'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('countries', [
      {
        country_name: 'Australia',
        iso_code: 'AU',
        lat: -25.274398,
        lng: 133.775136,
        flag: 'au.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Austria',
        iso_code: 'AT',
        lat: 47.516231,
        lng: 14.550072,
        flag: 'at.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Bangladesh',
        iso_code: 'BD',
        lat: 23.684994,
        lng: 90.356331,
        flag: 'bd.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Brazil',
        iso_code: 'BR',
        lat: -14.235004,
        lng: -51.92528,
        flag: 'br.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Canada',
        iso_code: 'CA',
        lat: 56.130366,
        lng: -106.346771,
        flag: 'ca.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Chile',
        iso_code: 'CL',
        lat: -35.675147,
        lng: -71.542969,
        flag: 'cl.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Colombia',
        iso_code: 'CO',
        lat: 4.570868,
        lng: -74.297333,
        flag: 'co.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Costa Rica',
        iso_code: 'CR',
        lat: 9.748917,
        lng: -83.753428,
        flag: 'cr.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Denmark',
        iso_code: 'DK',
        lat: 56.26392,
        lng: 9.501785,
        flag: 'dk.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Egypt',
        iso_code: 'EG',
        lat: 26.820553,
        lng: 30.802498,
        flag: 'eg.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Fiji',
        iso_code: 'FJ',
        lat: -16.578193,
        lng: 179.414413,
        flag: 'fj.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'France',
        iso_code: 'FR',
        lat: 46.227638,
        lng: 2.213749,
        flag: 'fr.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Germany',
        iso_code: 'DE',
        lat: 51.165691,
        lng: 10.451526,
        flag: 'de.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'India',
        iso_code: 'IN',
        lat: 20.593684,
        lng: 78.96288,
        flag: 'in.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Iran',
        iso_code: 'IR',
        lat: 32.427908,
        lng: 53.688046,
        flag: 'ir.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Ireland',
        iso_code: 'IE',
        lat: 53.41291,
        lng: -8.24389,
        flag: 'ie.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Israel',
        iso_code: 'IL',
        lat: 31.046051,
        lng: 34.851612,
        flag: 'il.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Italy',
        iso_code: 'IT',
        lat: 41.87194,
        lng: 12.56738,
        flag: 'it.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Jamaica',
        iso_code: 'JM',
        lat: 18.109581,
        lng: -77.297508,
        flag: 'jm.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Japan',
        iso_code: 'JP',
        lat: 36.204824,
        lng: 138.252924,
        flag: 'jp.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Jordan',
        iso_code: 'JO',
        lat: 30.585164,
        lng: 36.238414,
        flag: 'jo.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Malaysia',
        iso_code: 'MY',
        lat: 4.210484,
        lng: 101.975766,
        flag: 'my.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Mauritius',
        iso_code: 'MU',
        lat: -20.348404,
        lng: 57.552152,
        flag: 'mu.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Mexico',
        iso_code: 'MX',
        lat: 23.634501,
        lng: -102.552784,
        flag: 'mx.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Moldova',
        iso_code: 'MD',
        lat: 47.411631,
        lng: 28.369885,
        flag: 'md.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Mongolia',
        iso_code: 'MN',
        lat: 46.862496,
        lng: 103.846656,
        flag: 'mn.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'New Zealand',
        iso_code: 'NZ',
        lat: -40.900557,
        lng: 174.885971,
        flag: 'nz.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Nigeria',
        iso_code: 'NG',
        lat: 9.081999,
        lng: 8.675277,
        flag: 'ng.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Norway',
        iso_code: 'NO',
        lat: 60.472024,
        lng: 8.468946,
        flag: 'no.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Papua New Guinea',
        iso_code: 'PG',
        lat: -6.314993,
        lng: 143.95555,
        flag: 'pg.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Peru',
        iso_code: 'PE',
        lat: -9.189967,
        lng: -75.015152,
        flag: 'pe.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Rwanda',
        iso_code: 'RW',
        lat: -1.940278,
        lng: 29.873888,
        flag: 'rw.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Saudi Arabia',
        iso_code: 'SA',
        lat: 23.885942,
        lng: 45.079162,
        flag: 'sa.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Serbia',
        iso_code: 'RS',
        lat: 44.016521,
        lng: 21.005859,
        flag: 'rs.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Singapore',
        iso_code: 'SG',
        lat: 1.352083,
        lng: 103.819836,
        flag: 'sg.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Solomon Islands',
        iso_code: 'SB',
        lat: -9.64571,
        lng: 160.156194,
        flag: 'sb.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'South Africa',
        iso_code: 'ZA',
        lat: -30.559482,
        lng: 22.937506,
        flag: 'za.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'South Korea',
        iso_code: 'KR',
        lat: 35.907757,
        lng: 127.766922,
        flag: 'kr.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Sri Lanka',
        iso_code: 'LK',
        lat: 7.873054,
        lng: 80.771797,
        flag: 'lk.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Switzerland',
        iso_code: 'CH',
        lat: 46.818188,
        lng: 8.227512,
        flag: 'ch.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Taiwan',
        iso_code: 'TW',
        lat: 23.69781,
        lng: 120.960515,
        flag: 'tw.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Thailand',
        iso_code: 'TH',
        lat: 15.870032,
        lng: 100.992541,
        flag: 'th.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Turkey',
        iso_code: 'TR',
        lat: 38.963745,
        lng: 35.243322,
        flag: 'tr.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'UAE',
        iso_code: 'AE',
        lat: 23.424076,
        lng: 53.847818,
        flag: 'ae.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'United Kingdom',
        iso_code: 'GB',
        lat: 55.378051,
        lng: -3.435973,
        flag: 'gb.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'United States',
        iso_code: 'US',
        lat: 37.09024,
        lng: -95.712891,
        flag: 'us.png',
        year: 2021,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Uganda',
        iso_code: 'UG',
        lat: 1.373333,
        lng: 32.290275,
        flag: 'ug.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        country_name: 'Venezuela',
        iso_code: 'VE',
        lat: 6.42375,
        lng: -66.58973,
        flag: 've.png',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },

  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
