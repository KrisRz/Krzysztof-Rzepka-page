//@ts-nocheck
require("dotenv").config();
const express = require("express");
const Mailjet = require("node-mailjet");
const router = express.Router();

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC,
  apiSecret: process.env.MJ_APIKEY_PRIVATE,
});

router.post("/", async (req, res) => {
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  const { name, email, subject, message } = req.body;

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: process.env.SENDER_EMAIL,
          Name: name,
        },
        To: [
          {
            Email: process.env.RECIPIENT_EMAIL,
            Name: "Personal website contact form",
          },
        ],
        Subject: subject,
        HTMLPart: `<p>${message}</p><br/><p>From: ${email}</p>`,
      },
    ],
  });

  try {
    const result = await request;
    res.json(result.body);
  } catch (err) {
    res.status(err.statusCode).json({ error: err.message });
  }
});

module.exports = router;
