const http = require("http")
const fs = require("fs")
const server = http.createServer((req,res)=>{
    if(req.url=="/")
    {
        fs.readFile("data.txt",(e,i)=>{
            let text = i.toString();
            res.setHeader("Content-Type","text/html")
            res.end(`<h1>${text}</h1>
                <form action="/msg" method="post">
                <label>Name : </label>
                <input type="text" name="name">
                <button type="submit">Add</button>
                </form>`
            )
        })
    }
    else if(req.url=="/msg")
    {
        let arr = []
        req.on('data',(i)=>{
            arr.push(i)
        })
        req.on('end',()=>{
            let values = Buffer.concat(arr)
            let result = values.toString().split("=")[1]
            console.log(result)
            fs.writeFile("data.txt",result,()=>{
                res.statusCode = 302
                res.setHeader('Location','/')
                res.end()
            })
        })
    }
})
const port = 6008
server.listen(port,()=>{console.log(`listening at port ${port}`)})