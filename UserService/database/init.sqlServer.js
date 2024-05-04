const { Sequelize } = require('sequelize');

// Khởi tạo Sequelize với xác thực Windows
const mySql = new Sequelize('UserService', "sa", "1234", {
    host: 'localhost',
    dialect: 'mssql',
    logging: false,
});

// Test kết nối
(async () => {
    try {
        await mySql.authenticate();
        console.log('Kết nối thành công đến SQL Server');
    } catch (error) {
        console.error('Kết nối thất bại:', error);
    }
})();

module.exports = mySql;
