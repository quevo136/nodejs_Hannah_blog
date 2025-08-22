const newsRouter = require('./news');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const meRouter = require('./me');
const authRouter = require('./auth');

function route(app) {
  app.use('/news', newsRouter);
  app.use('/courses', coursesRouter);
  app.use('/', siteRouter);
  app.use('/me', meRouter);
  app.use('/api/auth', authRouter);
}

module.exports = route;
