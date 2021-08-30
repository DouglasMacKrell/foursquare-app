const router = require("express-promise-router")();
const venuesQueries = require("../queries/venues");
const fetch = require('node-fetch');


router.get("/:latLong", async (req, res, next) => {
    if (req.params.latLong === "") {
      res.json({
        status: 400,
        message: "Oops! All Errors!"
      })
    }
    const api_url = "https://api.foursquare.com/v2/venues/explore?";
    const params = {
      client_id: process.env.API_KEY,
      client_secret: process.env.API_SECRET,
      ll: req.params.latLong,
      query: "mexican",
      sortByDistance: 1,
      limit: 10,
      v: "20180323",
    };
    const fetch_response = await fetch(api_url + new URLSearchParams(params))
    const json = await fetch_response.json();
    res.json(json);
})

module.exports = router