const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;
const {
    routes,
} = require('./router/router');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on : ${port}`);
});


app.use(router);
routes(app);