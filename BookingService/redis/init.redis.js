// const PORT = 6379;
const redis = require("redis");

const client = redis.createClient();
// Bắt sự kiện kết nối thành công
client.on("connect", () => {
  console.log("Kết nối Redis thành công!");
});

// Bắt sự kiện lỗi kết nối
client.on("error", (error) => {
  console.error("Lỗi kết nối Redis:", error);
});

 client.connect();

module.exports = client;
