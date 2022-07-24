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

app.use("/users", routes.users);
app.use("/login", routes.auth);

(async function establishDbConnectionAndListenToPort() {
   await connectToDatabase().then(() => {
      app.listen(4000, () => {
         console.log("Rodando na porta 4000...");
      });
   });
})();
