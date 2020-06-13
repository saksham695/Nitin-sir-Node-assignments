function dbLog(req, res, next) {
  console.log("DB LOG");
  next();
}

module.exports = dbLog;
