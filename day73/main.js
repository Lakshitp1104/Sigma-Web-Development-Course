const express = require('express');
const app = express()
const port = 3000

app.use(express.static("public"))

app.get('/', (req, res) => {
  console.log("hey its a get requst")
  res.send('Hello World2!')
})

app.post('/', (req, res) => {
  console.log("hey its a post requst")
  res.send('Hello World2 post!')
})

app.put('/', (req, res) => {
  console.log("hey its a put requst")
  res.send('Hello World2 put!')
})

app.get("/index", (req, res) => {
  console.log("hey its a index")
  res.sendFile('template/index.html', {root:__dirname} )
})

app.get("/api", (req, res) => {
  res.json({a: 1, b:2, c:3, d:4})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})