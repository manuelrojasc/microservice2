const express = require("express");
const server = express();

const body_parser = require("body-parser");

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = process.env.PORT || 5000;

// << db setup >>
const db = require("./db");
const dbName = "pago";
const collectionName = "pagos";

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
   server.get("/ListPayments", (request, response) => {
      
      dbCollection.find().toArray((error, result) => {
         if (error) throw error;
         response.json(result);
      });
   });


   server.post("/addPayment", (request, response) => {
      const item = request.body;
          //const item={"codigo":"0001","descripcion":"este es un pago","codcurso":"000","codalumno":"001"}
      dbCollection.insertOne(item, (error, result) => { 
         const msg="Payment  was succefull added"
         response.json(msg)
      });
   });

}, function (err) { 
   throw (err);
});

server.listen(port, () => {
   console.log(`Server listening at ${port}`);
});






