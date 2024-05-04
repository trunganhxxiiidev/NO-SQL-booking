// const PORT = 6379;
const redis = require("redis");

const client = redis.createClient();
client.connect();

module.exports = client;
