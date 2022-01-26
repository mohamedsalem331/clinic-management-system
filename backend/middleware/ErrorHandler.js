const notFoundRoute = (req, res, next) => {
  res.status(404).send({ message: `not found route - ${req.originalUrl}` });
};

exports.errorRouteMiddleware = notFoundRoute;
