const http = require('http');
const url = require('url');
const handleLoginRoute = require('./routes/loginRoute');
const handleSignUpRoute = require('./routes/signUpRoute');



const server = http.createServer((req, res) => {
const { pathname } = url.parse(req.url, true);

  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (pathname === '/login') {
    handleLoginRoute(req, res);
  }
  else if (pathname === '/signup') {
    handleSignUpRoute(req, res);
  }
   else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
