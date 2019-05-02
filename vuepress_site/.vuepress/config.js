module.exports = {
  title: "Carolina Documentation",
  description: 'Documentation for the Carolina web framework.',
  themeConfig: {
    nav: [
      { text: 'Documentation', link: '/' }
    ],
    sidebar: {
      '/': [
        {
          title: 'Getting Started',
          children: [
            '/',
            '/docs/getting-started/config',
            '/docs/getting-started/structure'
          ]
        },
        {
          title: 'Framework Overview',
          children: [
            '/docs/overview/process',
            '/docs/overview/service-library',
            '/docs/overview/custom-services',
            '/docs/overview/services'
          ]
        },
        {
          title: 'Basics',
          children: [
            '/docs/basics/routing',
            '/docs/basics/middleware',
            '/docs/basics/csrf',
            '/docs/basics/controllers',
            '/docs/basics/requests',
            '/docs/basics/responses',
            '/docs/basics/template-views',
            '/docs/basics/session',
            '/docs/basics/validation',
            '/docs/basics/errors',
            '/docs/basics/logging',
            '/docs/basics/pug',
            '/docs/basics/crypto'
          ]
        },
        {
          title: 'Authentication',
          children: [
            '/docs/auth/auth',
            '/docs/auth/email-verification'
          ]
        },
        {
          title: "Advanced",
          children: [
            '/docs/advanced/cli',
            '/docs/advanced/events',
            '/docs/advanced/web-sockets',
            '/docs/advanced/files',
            '/docs/advanced/email',
            '/docs/advanced/plugins',
            '/docs/advanced/jobs',
            '/docs/advanced/testing',
            '/docs/advanced/requests'
          ]
        },
        {
          title: "Databases",
          children: [
            '/docs/db/db-service',
            '/docs/db/schemas',
            '/docs/db/models',
            '/docs/db/queries',
            '/docs/db/fixtures',
            '/docs/db/relations'
          ]
        },
        {
          title: "Included Plugins",
          children: [
            "/docs/plugins/admin",
            "/docs/plugins/auth",
            "/docs/plugins/aws"
          ]
        }
      ]
    }
  }
};
