function errorHandler(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;
  if (err.name == "CastError") {
    const message = "Resaurce not found";
    error = res.statusCode(404).send(message);
  }
}

export default errorHandler;
