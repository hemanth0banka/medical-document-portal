const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const documents = require('./routes/documents.js');
const sequelize = require('./util/db.js');
const errorHandler = require('./middlewares/errorHandler.js');
const port = process.env.port || 3000;
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use('/documents', documents);
app.use((req, res, next) => {
    const err = new Error('Page not found...')
    err.statusCode = 404
    next(err)
});
app.use(errorHandler);
(async () => {
    try {
        await sequelize.sync({ alter: true })
        app.listen(port, () => {
            console.log(`Listening at http://localhost:${port}/`)
        })
    }
    catch (e) {
        console.log(e)
    }
})();