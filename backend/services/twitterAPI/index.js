require("dotenv").config({ path: "../../.env" });
const { twitterClient } = require("./twitterClient.js");
const express = require("express");
const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const tweet = async () => {
  try {
    await twitterClient.v2.tweet("tweet from project");
  } catch (e) {
    console.log(e);
  }
};

tweet();
