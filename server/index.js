const express = require('express');
const bearerToken = require('express-bearer-token');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors');
const app = express();
const secret = 'shhhhhhThisIsASecret';
const port = 1331;

app.use(bearerToken());
app.use(cors());

function validateToken(req, res, next) {
  try {
    return jwt.verify(req.token, secret, (err, decoded) => {
      if (err) throw err;
      return next();
    });
  } catch (error) {
    return next(error);
  }
}

app.get('/friend/:gender', validateToken, async (req, res, next) => {
  try {
    const {
      data
    } = await axios({
      method: 'GET',
      url: `https://randomuser.me/api/?gender=${req.params.gender}`
    });

    return res.status(200).json({
      friend: data.results.pop()
    });
  } catch (error) {
    return next(error);
  }
});

app.get('/token', (req, res, next) => {
  return res.status(200).json({
    token: jwt.sign({
      use: 'demo'
    }, secret)
  })
});

app.use((error, req, res, next) => {
  res.status(400).json({
    message: error.message
  });
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});