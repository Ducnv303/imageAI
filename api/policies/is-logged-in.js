module.exports = async function (req, res, next) {

  try {
    let token = req.headers['authorization'];
    console.log("token", token);
    if (token) {
      if (token.includes('Bearer ')) {
        token = token.substring(7);
      }
      const decoded = await sails.helpers.decodeJwt(token)

      if (decoded.sub) {
        req.session.email = decoded.sub
        return next();
      }
      return res.forbidden(decoded);
    }
    return res.forbidden('You are not logged in');

  } catch (error) {
    res.status(401).json({ error: error.message });

  }
  // We couldn't find a session via cookies, let's check headers...


};