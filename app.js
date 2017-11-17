'use strict'

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const keys = require('./keys');

const app = express();
app.use(bodyParser.json());

const SUMMONERNAME = '<your_username_here>';

const header = {
  "Origin": "https://developer.riotgames.com",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  "X-Riot-Token": keys.API_KEY,
  "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
  "content-type": "application/json"
};

var api_url = `https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${SUMMONERNAME}?api_key=${keys.API_KEY}`;

app.get('/test', (req, res) => {
  request({
    headers: header,
    url: api_url,
    method: 'GET'
  }, (error, response, body) => {
    var body = JSON.parse(body);
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error sending message: ', response.body.error);
    } else {
      res.send(body);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
