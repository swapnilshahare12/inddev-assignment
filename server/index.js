require("dotenv").config();
const express = require("express");
const app = express();
require("./db/connection");
const cors = require("cors");
const port = process.env.PORT || 5000;
const userRoute = require("./routes/userRoute");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", userRoute);


app.listen(port, () => console.log(`server is running on port ${port}`));
