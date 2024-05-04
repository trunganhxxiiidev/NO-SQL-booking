const client = require("../../BookingService/redis/init.redis");

const redisServices = {
  async get(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, data) => {
        if (err) reject(err);
        resolve(data ? JSON.parse(data) : null);
      });
    });
  },

  async set(key, value) {
    try {
        client.set(key, JSON.stringify(value));
        return true
    } catch (error) {
        return error
    }
  },


  async remove(key) {
    try {
        client.del(key);
        return true
    } catch (error) {
        return error
    }
  }
};

module.exports = redisServices;
