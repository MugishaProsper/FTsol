

const authorizeRoles = (...roles) => {

  return (req, res, next) => {
    if(!req.roles || !roles.includes(req.user.roles)){
      return res.status(403).json({ message : "Access denied for such user" })
    }
    next();
  }

}

export default authorizeRoles;