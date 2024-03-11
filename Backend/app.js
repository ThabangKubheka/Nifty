const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/customers/customer_route');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
