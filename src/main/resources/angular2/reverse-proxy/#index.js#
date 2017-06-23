var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({ ws: true });

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  if (req.url.startsWith('/api') || req.url.startsWith('/ws') || req.url.startsWith('/log')) {
    console.log(`redirecting to Java for ${req.url}`);
    proxy.web(req, res, { target: 'http://localhost:5000' });
  } else {
    console.log(`redirecting to Angular for ${req.url}`);
    proxy.web(req, res, { target: 'http://127.0.0.1:4200' });
  }
});

server.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
});

console.log("listening on port 10000")
server.listen(10000);
