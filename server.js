require("dotenv").config();
const express = require("express");
const app = express();

app.get("/getRestaurants", (request, response) => {
   console.log("Get all restaurants");
   response.json({
      status: "success",
      restaurant: "Carls JR"
   });
});

app.listen(process.env.PORT, () => {
   console.log(`Server is up and listening on port ${process.env.PORT}`);
});