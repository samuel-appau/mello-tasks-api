module.exports = (req, res, next) => {
    if (!req.session.loggedIn) {
      return res.json({message:'Please you need to Log in'});
    }
    next();
  };
  