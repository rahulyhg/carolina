
exports = module.exports = [
  {
    route: "/forgot",
    methods: ['GET', 'POST'],
    controller: "Carolina/Auth/AuthController",
    method: 'forgot'
  },
  {
    route: "/forgot/:userId/:token",
    methods: ['GET', 'POST'],
    controller: "Carolina/Auth/AuthController",
    method: 'reset'
  },
  {
    route: "/login",
    methods: ['GET', 'POST'],
    controller: "Carolina/Auth/AuthController",
    method: 'login'
  },
  {
    route: "/logout",
    methods: ['GET', 'POST'],
    controller: "Carolina/Auth/AuthController",
    method: 'logout',
    middleware: ['Carolina/Auth/AuthGuardMiddleware']
  },
  {
    route: "/register",
    methods: ['GET', 'POST'],
    controller: "Carolina/Auth/AuthController",
    method: 'register'
  },
  {
    route: "/verify/:userId/:token",
    methods: ['GET'],
    controller: "Carolina/Auth/AuthController",
    method: 'verifyEmail'
  },
];