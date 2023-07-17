const { parse } = require('querystring');
const { signUpUser } = require('../controllers/signUpController');


const handleSignupRoute = async (req, res) => {
  const method = req.method.toLowerCase();

  if (method === 'post') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const formData = parse(body);
      const { email, firstname,lastname,password } = formData;
      
      const statusMessage = await signUpUser(email, password, firstname, lastname);
      
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(statusMessage);
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
};

module.exports = handleSignupRoute;