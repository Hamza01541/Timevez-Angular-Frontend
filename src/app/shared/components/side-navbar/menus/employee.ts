export const Employee = [
    {
        iconClass: 'fas fa-home',
        text: 'Dashboard',
        url: 'dashboard',
        linkType: 'internal',
      },
      {
        iconClass: 'far fa-file',
        text: 'App pages',
        subMenus: [
          {
            iconClass: 'fas fa-user',
            text: 'History',
            url: 'history',
            linkType: 'internal',
          },
          {
            iconClass: 'fas fa-user',
            text: 'Leave Request',
            url: 'leave',
            linkType: 'internal',
          }
        ]
      }
];