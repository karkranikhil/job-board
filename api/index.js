const express = require('express')
const redis = require('redis')
const client = redis.createClient();
const {promisify} = require('util')
const getAsync = promisify(client.get).bind(client);
const app = express()
const port = 3001

app.get('/api/Jobs', async(req, res) => {
    const jobs = await getAsync('github')
    console.log(JSON.parse(jobs).length)
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    return res.send(jobs)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))