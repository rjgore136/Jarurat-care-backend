const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500; // Default to 500 if no status code is set

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // Do not expose stack trace in production
  });
};

export default errorHandler;
