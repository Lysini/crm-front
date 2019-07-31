const express = require('express')
const app = express()
const cors = require('cors')
var bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/api/test', (req, res) => {
  return res.json({text: 'Hello in microservice'})
})

app.listen(3001, () => console.log('!!!Example app listening on port 3001!'))
