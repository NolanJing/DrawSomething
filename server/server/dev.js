//引入http模块
var http = require('http');
//引入fs模块
var fs = require('fs');
//引入url模块
var url = require('url');
//开启本地http服务，监听相应端口号
http.createServer(function (req, res) {
//获取requset信息中的host地址
    var hostname = req.headers.host;
//获取pathname
    var pathname = url.parse(req.url).pathname;
//判断是否为域名地址（简单路由）
    if (pathname === '/') {
        readFileAndResponse('/index.html', res);
    }
}).listen(3000);
//读取文件并返回response
function readFileAndResponse(pathname, response) {
//判断文件是否存在
    fs.readFile(pathname.substr(1), '', function (err, data) {
//文件不存在或读取错误返回404，并打印page not found
        if (err) {
            response.writeHead(404);
            response.end('page not found');
        }
        else {
//读取成功返回相应页面信息
            response.end(data);
        }
    });
}