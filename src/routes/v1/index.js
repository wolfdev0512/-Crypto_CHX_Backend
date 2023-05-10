const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const dashboardRoute = require('./dashboard.route');
const faqRoute = require('./faq.route');
const teamRoute = require('./team.route');
const videoRoute = require('./video.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/dashboard',
    route: dashboardRoute,
  },
  {
    path: '/faqs',
    route: faqRoute,
  },
  {
    path: '/teams',
    route: teamRoute,
  },
  {
    path: '/video',
    route: videoRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
