const userService = require('./contractor_service');

async function registerContractor(req, res) {
  try {
    const { username, password, Email } = req.body;
    const user = await userService.register(username, password ,Email);
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
  registerContractor,
  login,
};
