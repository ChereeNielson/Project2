var db = require("../models");
var axios = require("axios");
require("dotenv").config();
module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Reservation.findAll({}).then(function(dbReservation) {
      res.json(dbReservation);
    });
  });
  app.get("/api/nasa/images", function(req, res) {
    var apiKey = process.env.NASA_API;
    axios
      .get("https://api.nasa.gov/planetary/apod?api_key=" + apiKey)
      .then(function(response) {
        res.send(response.data);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error);
      });
  });
  // Create a new example
  app.post("/api/reservations", function(req, res) {
    db.Reservation.create(req.body).then(function(dbReservation) {
      res.json(dbReservation);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Reservation.destroy({ where: { id: req.params.id } }).then(function(
      dbReservation
    ) {
      res.json(dbReservation);
    });
  });
};
