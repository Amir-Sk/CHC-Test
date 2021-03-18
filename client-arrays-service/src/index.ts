import express from "express"
import cors from 'cors'
import fetch from 'node-fetch'
import config from './config'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const port = config.CLIENT_ARRAYS_PORT
const logServiceURL = `http://${config.LOG_HOST}:${config.LOG_PORT}/`

app.post('/', async (req, res) => {
  const num = req.body.number || 0
  const result = []
  console.log(`Received a POST request with the following number: ${num}`)
  if (num > 1 && num < 1000) {
    for (let i = num - 1; i > 0; i--) {
      result.push(i)
    }
  }
  await fetch(logServiceURL, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ array: result })
  })
  res.send(result)
})

app.listen(port, () => {
  console.log(`Client Array Service is listening at http://localhost:${port}`)
})