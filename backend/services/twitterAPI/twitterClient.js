require("dotenv").config({ path: "../../.env" });

const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const bearer = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

const tweet = async () => {
  try {
    await twitterClient.v2.tweet("TEST!");
  } catch (e) {
    console.log(e);
  }
};

tweet();

module.exports = { tweet };
