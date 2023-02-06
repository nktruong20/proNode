const express = require('express');
const server = express();
const cors = require('cors')
    // cài đặt để sử dụng form body 
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json()); //. api
server.set('view engine', 'html');
server.engine('html', require('ejs').renderFile);

// server.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
server.use(cors());

const conn = require('./connect');
server.use(express.static('public'));
// khong can kiemr tra login van vao duoc

// require('./routes/login')(server);
require('./routes/home')(server);
require('./routes/category')(server);
require('./routes/account')(server);
require('./routes/favorite')(server);

// middleware => kieemr tra login truoc khi vao cacs  router
// server.use(function(req, res, next) {
//     if (!req.session.login) {
//         res.redirect('/admin/login');
//     } else {
//         server.locals.name = req.session.login.name;
//     }
//     next();
// })

// chia router
// require('./routes/admin')(server);

require('./routes/Product')(server);
require('./routes/tour')(server);

server.listen(3000, function() {
    console.log('Server listening on port  http://localhost:3000');
})