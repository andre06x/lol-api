const express = require("express");
const cors = require("cors");

const { json } = require("express");

const Router = require("./routes");

require("dotenv").config();
const app = express();

app.use(json());
app.use(cors());
app.listen(3333);

app.use(Router);
