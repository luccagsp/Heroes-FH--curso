import fs from 'fs'
import http from 'http';

const server = http.createServer((request, response)=>{

  console.log(request.url)

  // response.write('<h1>Hola</h1>')
  const user = {name:'john doe', age:30, city:'new york'}
  
  if (request.url === '/') {
    const document = fs.readFileSync('./public/index.html', 'utf-8')
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(document)
    return
  }

  //* extension detector
  if (request.url?.endsWith('.js')) {
    response.writeHead(200, {'Content-Type': 'application/javascript'})
  }
  if (request.url?.endsWith('.css')) {
    response.writeHead(200, {'Content-Type': 'text/css'})
  }

  console.log(request.url)
  
  const responseContent = fs.readFileSync(`./public/${request.url}`, 'utf-8')
  response.end(responseContent)
  
})

server.listen(8080, () => {
  console.log("server running on port 8080")
})