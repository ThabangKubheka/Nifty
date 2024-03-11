const customerService = require('./customer_service');

async function register(req, res) {
  try {
    const { username, password, userType, email } = req.body;
    const user = await customerService.register(username, password, userType, email);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await customerService.login(username, password);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function updateDetails(req, res) {
  try {
    const email = req.params.email;
    const newDetails = req.body;
    await customerService.updateDetails(email, newDetails);
    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const email = req.params.email;
    await customerService.deleteUser(email);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
  updateDetails,
  deleteUser
};
