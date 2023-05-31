const { parse } = require('querystring');
const { loginUser } = require('../controllers/loginController');

const handleLoginRoute = async (req, res) => {
  const method = req.method.toLowerCase();

  if (method === 'post') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const formData = parse(body);
      const { email, password } = formData;
      
      const statusMessage = await loginUser(email, password);
      
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(statusMessage);
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
};

module.exports = handleLoginRoute;