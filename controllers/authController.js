const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');

exports.register = async (req, res) => {
  try {
    const { email, password, name, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, username }
    });
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, username: user.username } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Find user by username or email
    let user;
    if (username) {
      user = await prisma.user.findUnique({ where: { username } });
    } else if (email) {
      user = await prisma.user.findUnique({ where: { email } });
    } else {
      return res.status(400).json({ error: 'Username or email is required' });
    }
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, username: user.username } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};
