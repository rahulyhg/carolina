
/**
 * Configuration for the carolina/plugins/admin plugin.
 */
exports = module.exports = {

  sections: [
    {
      title: "Users & Roles",
      icon: 'user',
      description: "This section is for managing users and roles.",
      models: [ 'User', 'Role' ]
    },
    {
      title: "Site Data",
      icon: 'database',
      models: ['LogEntry', 'SessionInfo']
    }
  ],
  
  modelActions: {
    'User': {
      collection: [
        'Carolina/Admin/CreateTestUsersAction',
        'Carolina/Admin/DeleteNonAdminAction'
      ],
      instance: [
        'Carolina/Admin/SetPasswordAction',
        'Carolina/Admin/EmailUserAction'
      ]
    },
    'LogEntry': {
      collection: ['Carolina/Admin/DropTableAction']
    },
    'SessionInfo': {
      collection: ['Carolina/Admin/DropTableAction']
    }
  }
};