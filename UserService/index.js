
const express = require('express')
const app = express()
const port = 3002
const cors = require('cors');

const bodyParser = require("body-parser");

app.use(cors())

app.use(bodyParser.json()); // Xử lý dữ liệu gửi đến dạng JSON

app.use(bodyParser.urlencoded({ extended: true }));


// require("./database/init.mongodb")
// Kết nối cơ sở dữ liệu Mongo

require("./database/init.sqlServer")
// Kết nối cơ sở dữ liệu SQL server

// require("./redis/init.redis")
// Kết nối REDIS


app.use("/api/user/", require("./routes/user.route"));
app.use("/api/account/", require("./routes/account.route"));
// app.use("/api/", require("./routes/product.route"));
// Khai báo route API


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Khởi động User service với PORT: ${port}`)
})


// bắt đầu từ đây
