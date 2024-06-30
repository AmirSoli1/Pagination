const fs = require("fs");
const path = require("path");

const logStream = fs.createWriteStream(path.join("log.txt"), {
  flags: "a",
});

const formatLogEntry = (req) => {
  const date = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const body = JSON.stringify(req.body);

  return `[${date}] ${method} ${url} ${body}\n`;
};

const logger = (req, res, next) => {
  const logEntry = formatLogEntry(req);
  logStream.write(logEntry);
  next();
};

module.exports = logger;
