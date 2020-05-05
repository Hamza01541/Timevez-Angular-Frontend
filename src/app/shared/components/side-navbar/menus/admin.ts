export const Admin = [
  {
    iconClass: 'fas fa-home',
    text: 'Dashboard',
    url: '/admin/dashboard',
    linkType: 'internal',
  },
  {
    iconClass: 'far fa-file',
    text: 'App pages',
    subMenus: [
      {
        iconClass: 'fas fa-user',
        text: 'Employees',
        url: '/admin/employee',
        linkType: 'internal',
      },
    ]
  }
];