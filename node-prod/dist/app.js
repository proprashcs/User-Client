'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _routes = require('./config/routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://localhost/invoice-builder');
var app = (0, _express2.default)();
var PORT = 3000;
app.use('/api', _routes.router);
//middleware
// app.use((req,res,next)=>{
//     console.log("Custom middleware run!");
//     next()
// })


app.listen(PORT, function () {
  console.log('server is  running at port ' + PORT);
});
//# sourceMappingURL=app.js.map