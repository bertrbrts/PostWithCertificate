require('dotenv').config();
const express = require('express');
const https = require('https');
const axios = require('axios');
var fs = require('fs');
const app = express();

const clientID = "<insert client id>";
const clientSecret = "<enter client secret>";

const agent = new https.Agent({
    // rejectUnauthorized is unsafe outside of a devlopment environment
    rejectUnauthorized: false,
    pfx: fs.readFileSync(__dirname + "<enter certificate path>"),
    passphrase: "<enter certificate password>"
});

const options = {
    url: "<enter api url>",
    method: "POST",
    httpsAgent: agent,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + new Buffer.from(clientID + ':' + clientSecret).toString('base64')
    },
    data: 'grant_type=client_credentials'
};

app.get('/', (req, res) => {
    const response = axios(options)
        .then(response => {
            payload = response.data;
            return res.status(200).send(payload);
        })
        .catch(err => {
            console.log(err);
            return false;
        });
});

app.listen(3000);