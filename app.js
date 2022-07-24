const express = require("express");
const app = express();
const routes = require("./src/routes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const { connectToDatabase } = require("./database/db");

app.use(cors());
app.use(bodyParser.json());

//ROUTES
app.use("/users", routes.users);
app.use("/login", routes.auth);
app.use("/pets", routes.pets);

//DATABASE
(async function establishDbConnectionAndListenToPort() {
   await connectToDatabase().then(() => {
      app.listen(4000, () => {
         console.log("Rodando na porta 4000...");
      });
   });
})();
