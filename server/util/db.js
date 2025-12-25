const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.db_name, process.env.db_username, process.env.db_password, {
    host: process.env.host,
    dialect: process.env.dialect
});
(async () => {
    try {
        await sequelize.authenticate()
        console.log('DataBase Connected...')
    }
    catch (e) {
        console.log(e)
    }
})()
module.exports = sequelize