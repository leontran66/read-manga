const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.header('x-auth-token')
    if (!token) {
      return res.status(401).json({ error: 'Authorization denied' })
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified.user

    next();
  } catch (error) {
    res.status(401).json({ error: 'Authorization denied' })
  }
}