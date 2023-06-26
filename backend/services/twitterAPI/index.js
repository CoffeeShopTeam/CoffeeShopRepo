require("dotenv").config({ path: "../../.env" });
const { twitterClient } = require("./twitterClient.js");

const tweet = async () => {
  try {
    await twitterClient.v2.tweet("tweet from project");
  } catch (e) {
    console.log(e);
  }
};

module.exports = tweet;
