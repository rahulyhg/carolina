
exports = module.exports = [
  {
    route: "/",
    controller: 'Carolina/Admin/AdminController',
    method: 'home'
  },
  {
    route: "/api/list-sections",
    controller: 'Carolina/Admin/AdminController',
    method: 'listSections'
  },
  {
    route: "/api/admin-link",
    controller: 'Carolina/Admin/AdminController',
    method: 'getAdminLink',
    data: { csrfExempt: true }
  },
  {
    route: "/api/section/:sectionIndex",
    controller: 'Carolina/Admin/AdminController',
    method: 'getSection'
  },
  {
    route: "/api/section/:sectionIndex/model/:modelIndex/schema",
    controller: 'Carolina/Admin/AdminController',
    method: 'getModelSchema'
  },
  {
    route: "/api/section/:sectionIndex/model/:modelIndex/actions",
    controller: 'Carolina/Admin/AdminController',
    method: 'getModelActions'
  },
  {
    route: "/api/section/:sectionIndex/model/:modelIndex/instance-actions",
    controller: 'Carolina/Admin/AdminController',
    method: 'getInstanceActions'
  },
  {
    route: "/api/section/:sectionIndex/model/:modelIndex/action/:actionIndex",
    controller: 'Carolina/Admin/AdminController',
    method: 'doModelAction',
    data: { csrfExempt: true }
  },
  {
    route: "/api/section/:sectionIndex/model/:modelIndex/instance/:id/action/:actionIndex",
    controller: 'Carolina/Admin/AdminController',
    method: 'doInstanceAction',
    data: { csrfExempt: true }
  },
  {
    route: "/api/section/:sectionIndex/model/:modelIndex/create",
    controller: 'Carolina/Admin/AdminController',
    method: 'newModelInstance',
    data: { csrfExempt: true }
  },
  {
    route: "/api/section/:sectionIndex/model/:modelIndex/:pageNumber",
    controller: 'Carolina/Admin/AdminController',
    method: 'listModel'
  },
  {
    route: "/api/section/:sectionIndex/model/:modelIndex/view/:id",
    controller: 'Carolina/Admin/AdminController',
    method: 'getModelInstance'
  },
  {
    route: "/api/section/:sectionIndex/model/:modelIndex/edit/:id",
    controller: 'Carolina/Admin/AdminController',
    method: 'updateModelInstance',
    data: { csrfExempt: true }
  },
  {
    route: "/api/section/:sectionIndex/model/:modelIndex/delete/:id",
    controller: 'Carolina/Admin/AdminController',
    method: 'deleteModelInstance',
    data: { csrfExempt: true }
  }
];