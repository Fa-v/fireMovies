const express = require('express');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.get('/', function(req, res) {
  res.send('Hello movies! 🎬');
});

app.listen(port, function() {
  console.log(`listening from port ${port}`);
});
