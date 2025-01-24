const checkRole = (role) => {
  return (req, res, next) => {
    // console.log("Inside role middleware");

    // Ensure the user has a valid role
    if (req.user && req.user.role === role) {
      return next();
    }

    return res.status(403).json({
      message: `Access denied. You must be an ${role} to perform this action.`,
    });
  };
};

export default checkRole;
