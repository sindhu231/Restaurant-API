const logger = (req, res, next) => {
  console.log(`Request ${req.method} url ${req.url}`);
  next(); 
};

export default logger;
