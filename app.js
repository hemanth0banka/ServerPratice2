const http = require("http")
const direction = require("./routes.js")
const server = http.createServer(direction)
const port = 6009
server.listen(port,()=>{console.log(`listening at port ${port}`)})