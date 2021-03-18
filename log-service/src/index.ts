import express from "express"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 8082

app.post('/', (req, res) => {
  const arr = req.body.array
  console.log('recieved array', arr)
  res.send(true)
})

app.listen(port, () => {
  console.log(`Log Service is listening at http://localhost:${port}`)
})