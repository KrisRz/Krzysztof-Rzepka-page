//@ts-nocheck
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const sendEmail = require("./api/sendEmail");

const app = express();

const corsOptions = {
  origin: "krisgrzepka.uk",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/send-email", sendEmail);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
