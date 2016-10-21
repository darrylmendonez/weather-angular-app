exports.home = function(req, res, next) {
  res.sendFile(process.cwd() + '/public/index.html');
}
