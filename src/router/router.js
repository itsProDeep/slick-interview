const { pool } = require("../utils/mysql");
const { redisClient } = require("../utils/redisClient");

const routes = (app) => {
app.get('/healthCheck', async (req, res, next) => {
    try {
        const redisKey = 'test';
        const redisData = await redisClient.get(redisKey)
        if(redisData) console.log(redisData);
        await redisClient.set(redisKey, 'Redis is working',  'EX', 20);
        return res.status(200).send('Healthy!');
    } catch (err) {
        return next(err);
    }
});
}
module.exports = {
    routes,
};
