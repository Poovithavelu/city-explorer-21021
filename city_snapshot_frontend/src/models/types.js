/**
 * Lightweight JSDoc typedefs for the app's domain objects
 */

/**
 * @typedef {Object} GeoCity
 * @property {string} id - unique identifier composed from name+country+lat+lon
 * @property {string} name
 * @property {string} country
 * @property {string=} admin1
 * @property {number} latitude
 * @property {number} longitude
 * @property {number=} population
 */

/**
 * @typedef {Object} WeatherNow
 * @property {number} temperature
 * @property {string} weathercode
 * @property {number=} windspeed
 * @property {number=} winddirection
 * @property {string} timeISO
 */

/**
 * @typedef {Object} WikiSummary
 * @property {string} title
 * @property {string} extract
 * @property {string=} thumbnail
 * @property {string} url
 */

/**
 * @typedef {Object} CitySnapshot
 * @property {GeoCity} city
 * @property {WeatherNow=} weather
 * @property {WikiSummary=} wiki
 */
