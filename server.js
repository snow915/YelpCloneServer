require("dotenv").config();
const express = require("express");
const app = express();

// GET ALL RESTAURANTS
app.get("/api/v1/restaurants", (request, response) => {
   console.log("Get all restaurants");
   response.json({
      status: "success",
      restaurant: "Carls JR"
   });
});

//GET A RESTAURANT
app.get("/api/v1/restaurants/:id", (request, response) => {
   console.log(request.params);
});

//CREATE A RESTAURANT
app.post("/api/v1/restaurants", (request, response) => {
   console.log(request);
});

app.listen(process.env.PORT, () => {
   console.log(`Server is up and listening on port ${process.env.PORT}`);
});
