require("dotenv").config();
const express = require("express");
const db = require("./db");
const morgan = require("morgan");
const app = express();

//MIDDLEWARE
app.use(express.json());

// GET ALL RESTAURANTS
app.get("/api/v1/restaaurants", async (request, response) => {
   const results = await db.query("SELECT * FROM restaurants");
   console.log(results);
   response.json({
      status: "success",
      restaurant: "Carls JR"
   });
});

//GET A RESTAURANT
app.get("/api/v1/restaurants/:id", (request, response) => {
   console.log(request.params);
   response.status(200).json({
      status: "success",
      data: {
         restaurant: "some restaurant"
      }
   });
});

//CREATE A RESTAURANT
app.post("/api/v1/restaurants", (request, response) => {
   console.log(request.body);
   response.status(201).json({
      status: "success",
      data: {
         restaurant: "some restaurant"
      }
   });
});

//UPDATE RESTAURANT
app.put("/api/v1/restaurants/:id", (request, response) => {
   console.log(request.params.id);
   console.log(request.body);
   response.status(200).json({
      status: "success",
      data: {
         restaurant: "some restaurant"
      }
   });
});

//DELETE RESTAURANT
app.delete("/api/v1/restaurants/:id", (request, response) => {
   response.status(204).json({
      status: "success"
   });
});

app.listen(process.env.PORT, () => {
   console.log(`Server is up and listening on port ${process.env.PORT}`);
});
