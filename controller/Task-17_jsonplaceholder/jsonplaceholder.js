function jsonplaceholder(req, res) {
  res.render('Task-17_jsonplaceholder/jsonplaceholdertable');
}

function posts(req, res) {
  res.render('Task-17_jsonplaceholder/post');
}

module.exports = { jsonplaceholder, posts };