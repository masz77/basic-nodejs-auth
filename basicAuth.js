function authUser(req, res, next) {
  if (req.user == null) {
    return res.status(403).json({ message: "you need to log in" });
  }
  next();
}

function authRole(ROLE) {
  return (req, res, next) => {
    if (req.user.role != ROLE) {
      return res.status(401).json({ message: "not allowed" });
    }
    next();
  };
}

module.exports = {
  authUser,
  authRole,
};
