import nodeFetch from 'node-fetch' // fetch for node
import express from 'express' // express
import dotenv from 'dotenv' // 
import path from 'path'

dotenv.config() // setup .env environment variables
const apiKey = process.env.SERP_API_KEY // get api key from .env environment variables


const app = express() // initialize express server

// setup public directory
const __dirname = path.resolve(path.dirname('')) // get full path
app.use(express.static(__dirname + '/public')); // load static files from public directory

// express get route /images?search=
app.get('/images', async (req, res) => {
  const {search} = req.query
  const imgSearchUrl = `https://serpapi.com/search.json?engine=google&q=${search}&location=Austin%2C+Texas%2C+United+States&google_domain=google.com&gl=us&hl=en&safe=active&tbm=isch&ijn=1&device=desktop&api_key=${apiKey}`
  const response = await nodeFetch(imgSearchUrl)
  const result = await response.json();
  res.json(result)
})

// start the server
const port = 8081
app.listen(port, () => console.log(`listing on port: ${port}`))