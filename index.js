const PORT = 8000

const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()
const games = []

app.get('/', (req,res) => {
    res.json('Welcome to the arb api')
})

app.get('/fanduel', (req,res) => {
    axios.get('https://sportsbook.fanduel.com/navigation/nba')
        .then((response) =>  {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("span:contains("Boston")")', html).each(function () {
                const teams = $(this).attr('title')
                const odds = $(this).attr('href')
                games.push({
                    teams,
                    odds
                })
            })
            res.json(games)
        }).catch((err) => console.log(err))
})
app.get('/test', (req,res) => {
    axios.get('https://www.theguardian.com/environment/climate-crisis')
        .then((response) =>  {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("Climate")', html).each(function () {
                const teams = $(this).text()
                const odds = $(this).attr('href')
                games.push({
                    teams,
                    odds
                })
            })
            res.json(games)
        }).catch((err) => console.log(err))
})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))