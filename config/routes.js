export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              {
                path: '/org',
                name: 'org',
                icon: 'table',
                routes: [
                  {
                    path: '/org/depart',
                    name: 'depart',
                    icon: 'table',
                    component: './org/depart',
                  },
                  {
                    path: '/org/user',
                    name: 'user',
                    icon: 'table',
                    component: './org/user',
                  },
                ],
              },
              {
                path: '/ims',
                name: 'ims',
                icon: 'table',
                routes: [
                  {
                    path: '/ims/material',
                    name: 'material',
                    icon: 'table',
                    component: './ims/material',
                  },
                  {
                    path: '/ims/purchase',
                    name: 'purchase',
                    icon: 'table',
                    component: './ims/purchase',
                  },
                  {
                    path: '/ims/purchase_audit_history',
                    name: 'purchase_audit_history',
                    icon: 'table',
                    component: './ims/purchase_audit_history',
                    menu: false,
                  },
                ],
              },
              {
                path: '/stock',
                name: 'stock',
                icon: 'table',
                routes: [
                  {
                    path: '/stock/in',
                    name: 'in',
                    icon: 'table',
                    component: './stock/in',
                  },
                  {
                    path: '/stock/out',
                    name: 'out',
                    icon: 'table',
                    component: './stock/out',
                  },
                  {
                    path: '/stock/list',
                    name: 'list',
                    icon: 'table',
                    component: './stock/list',
                  },
                  {
                    path: '/stock/warehouse',
                    name: 'warehouse',
                    icon: 'table',
                    component: './stock/warehouse',
                  },
                ],
              },
              {
                path: '/project',
                name: 'project',
                icon: 'table',
                routes: [
                  {
                    path: '/project/apply',
                    name: 'apply',
                    icon: 'table',
                    component: './project/apply',
                  },
                  {
                    path: '/project/apply/create',
                    name: 'create',
                    icon: 'table',
                    component: './project/apply/components/create',
                    menu: false,
                  },
                  {
                    path: '/project/apply/update',
                    name: 'update',
                    icon: 'table',
                    component: './project/apply/components/update',
                    menu: false,
                  },
                  {
                    path: '/project/plan/create',
                    name: 'create',
                    icon: 'table',
                    component: './project/plan/components/create',
                    menu: false,
                  },
                  {
                    path: '/project/plan',
                    name: 'plan',
                    icon: 'table',
                    component: './project/plan',
                  },
                  {
                    path: '/project/plan/node',
                    name: 'plan.node',
                    icon: 'table',
                    component: './project/plan/components/node',
                    menu: false,
                  },
                  {
                    path: '/project/team',
                    name: 'team',
                    icon: 'table',
                    component: './project/team',
                    menu: false,
                  },
                  {
                    path: '/project/plan/reimburse',
                    name: 'team',
                    icon: 'table',
                    component: './project/plan/components/reimburse',
                    menu: false,
                  },
                  {
                    path: '/project/plan/reimburse_audit_history',
                    name: 'team',
                    icon: 'table',
                    component: './project/plan/components/reimburse_audit_history',
                    menu: false,
                  },
                ],
              },
              {
                path: '/construction',
                name: 'construction',
                icon: 'table',
                routes: [
                  {
                    path: '/construction/eng_staff_type',
                    name: 'eng_staff_type',
                    icon: 'table',
                    component: './construction/eng_staff_type',
                  },
                  {
                    path: '/construction/eng_staff',
                    name: 'eng_staff',
                    icon: 'table',
                    component: './construction/eng_staff',
                  },
                ],
              },

              {
                path: '/info_base',
                name: 'info_base',
                icon: 'table',
                routes: [
                  {
                    path: '/info_base/supplier',
                    name: 'supplier',
                    icon: 'table',
                    component: './info_base/supplier',
                  },
                  {
                    path: '/info_base/customer',
                    name: 'customer',
                    icon: 'table',
                    component: './info_base/customer',
                  },
                  {
                    path: '/info_base/third_party_team',
                    name: 'third_party_team',
                    icon: 'table',
                    component: './info_base/third_party_team',
                  },
                  {
                    path: '/info_base/temp_worker',
                    name: 'temp_worker',
                    icon: 'table',
                    component: './info_base/temp_worker',
                  },
                ],
              },
              {
                name: 'attendance',
                icon: 'table',
                path: '/attendance',
                component: './attendance',
              },
              {
                name: 'elec_info',
                icon: 'table',
                path: '/elec_info',
                routes: [
                  {
                    path: '/elec_info/third_project',
                    name: 'third_project',
                    icon: 'table',
                    component: './elec_info/third_project',
                  },
                  {
                    path: '/elec_info/contract_template',
                    name: 'contract_template',
                    icon: 'table',
                    component: './elec_info/contract_template',
                  },
                ]
              },
              {
                name: 'report',
                icon: 'table',
                path: '/report',
                routes: [
                  {
                    path: '/report/template',
                    name: 'template',
                    icon: 'table',
                    component: './report/template',
                  },
                ]
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './TableList',
                authority: ['admin'],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
