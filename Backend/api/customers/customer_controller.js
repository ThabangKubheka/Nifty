const userService = require('./customer_service');

async function register(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userService.register(username, password);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userService.login(username, password);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
};
