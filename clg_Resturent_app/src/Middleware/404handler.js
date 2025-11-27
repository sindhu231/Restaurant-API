const handler404 = (req, res, next) => {
  const error = new Error("The page / resource is not found!");
  error.status = 404;
  next(error);
};

export default handler404;
