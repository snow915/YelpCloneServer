require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require("cors");
const app = express();

//MIDDLEWARE
app.use(cors({origin: "http://34.226.136.222:3000"}));
app.use(express.json());

// GET ALL RESTAURANTS
app.get("/api/v1/restaurants", async (request, response) => {
   try{
      const results = await db.query("SELECT * FROM restaurants");
      response.json({
         status: "success",
         results: results.rows.length,
         data: {
            restaurants: results.rows
         }
      });
   } catch (e) {
      console.log(e);
   }
});

//GET A RESTAURANT
app.get("/api/v1/restaurants/:id", async (request, response) => {
   try {
      const result = await db.query("SELECT * FROM restaurants WHERE id = $1", [request.params.id]);
      response.status(200).json({
         status: "success",
         results: result.rows.length,
         data: {
            restaurants: result.rows
         }
      });
   } catch (e) {
      console.log(e);
   }
});

//CREATE A RESTAURANT
app.post("/api/v1/restaurants", async (request, response) => {
   try {
      let body = request.body;
      const data = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", [body.name, body.location, body.price_range]);
      response.status(201).json({
         status: "success",
         data: {
            restaurant: data.rows
         }
      });
   } catch (e) {
      console.log(e);
   }

});

//UPDATE RESTAURANT
app.put("/api/v1/restaurants/:id", async (request, response) => {
   try{
      let id = request.params.id;
      let body = request.body;
      const data = await db.query("UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id = $4 RETURNING *", [body.name, body.location, body.price_range, id]);
      response.status(200).json({
         status: "success",
         data: {
            restaurant: data.rows
         }
      });
   } catch (e) {
      console.log(e);
   }

});

//DELETE RESTAURANT
app.delete("/api/v1/restaurants/:id", async (request, response) => {
   try{
      const row = await db.query("DELETE FROM restaurants WHERE id=$1", [request.params.id]);
      if(row.rowCount > 0){
         response.status(204).json({
            status: "deleted"
         });
      } else {
         response.status(204).json({
            status: "no_deleted"
         });
      }

   } catch (e) {
      console.log(e);
   }

});

app.listen(process.env.PORT, () => {
   console.log(`Server is up and listening on port ${process.env.PORT}`);
});
