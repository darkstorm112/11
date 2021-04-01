const Koa = require('koa');
const bodyParser = require('koa-bodyparser')

const useRoutes = require('../router') 

const app = new Koa()

app.use(bodyParser())

module.exports = app

