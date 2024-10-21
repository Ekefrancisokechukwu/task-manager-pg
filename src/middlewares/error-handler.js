const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err);

  const customError = {
    message: err.message || "Something went wrong",
    statusCode: err.statusCode || 500,
  };

  if (err.code === "ECONNREFUSED") {
    customError.message = "Database connection failed. Please try again later.";
    customError.statusCode = 500;
  }

  if (err.code === "22P02") {
    customError.message = "Invalid input syntax.";
    customError.statusCode = 400;
  }

  res.status(customError.statusCode).json({ messsage: customError.message });
};

module.exports = errorHandlerMiddleware;
