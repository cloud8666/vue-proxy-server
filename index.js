const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const proxyTable = require('./proxy.config.json');
app.use(express.static('./public'));

for(var i = 0;i < proxyTable.length;i++)
{
  app.use(proxyTable[i].path,createProxyMiddleware(proxyTable[i].option));
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));
