const express = require('express');
const bodyParser = require('body-parser');
const { register, login, updateDetails, deleteUser } = require('./api/customers/customer_controller');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/register', register);
app.post('/login', login);
app.put('/update/:email', updateDetails);
app.delete('/delete/:email', deleteUser);



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
