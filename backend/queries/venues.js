// DATABASE CONNECTION
const { query } = require("express");
const db = require("../db");

//GET
const getVenues = async (latLong, query) => {
  const endPoint = "https://api.foursquare.com/v2/venues/explore";
  const params = {
    client_id: process.env.API_KEY,
    client_secret: process.env.API_SECRET,
    ll: latLong,
    query: query,
    v: 20180323,
  };
  const getQuery = endPoint + new URLSearchParams(params)

  let venues = await db.any(getQuery, [latLong, query]);
  return venues;
};

/* EXPORT */
module.exports = {
    getVenues
}