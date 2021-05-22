// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/wangyu/Repository/zyoa/front-demo/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'/Users/wangyu/Repository/zyoa/front-demo/src/layouts/BlankLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/Users/wangyu/Repository/zyoa/front-demo/src/layouts/UserLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "name": "login",
            "path": "/user/login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__User__login' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/User/login'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'/Users/wangyu/Repository/zyoa/front-demo/src/layouts/SecurityLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/Users/wangyu/Repository/zyoa/front-demo/src/layouts/BasicLayout'), loading: LoadingComponent}),
            "authority": [
              "admin",
              "user"
            ],
            "routes": [
              {
                "path": "/",
                "redirect": "/welcome",
                "exact": true
              },
              {
                "path": "/welcome",
                "name": "welcome",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/Welcome'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/admin",
                "name": "admin",
                "icon": "crown",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Admin' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/Admin'), loading: LoadingComponent}),
                "authority": [
                  "admin"
                ],
                "routes": [
                  {
                    "path": "/admin/sub-page",
                    "name": "sub-page",
                    "icon": "smile",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/Welcome'), loading: LoadingComponent}),
                    "authority": [
                      "admin"
                    ],
                    "exact": true
                  }
                ]
              },
              {
                "path": "/org",
                "name": "org",
                "icon": "table",
                "routes": [
                  {
                    "path": "/org/depart",
                    "name": "depart",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__org__depart' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/org/depart'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/org/user",
                    "name": "user",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__org__user' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/org/user'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "path": "/ims",
                "name": "ims",
                "icon": "table",
                "routes": [
                  {
                    "path": "/ims/material",
                    "name": "material",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ims__material' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/ims/material'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/ims/purchase",
                    "name": "purchase",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ims__purchase' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/ims/purchase'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/ims/purchase_audit_history",
                    "name": "purchase_audit_history",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ims__purchase_audit_history' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/ims/purchase_audit_history'), loading: LoadingComponent}),
                    "menu": false,
                    "exact": true
                  }
                ]
              },
              {
                "path": "/stock",
                "name": "stock",
                "icon": "table",
                "routes": [
                  {
                    "path": "/stock/in",
                    "name": "in",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__stock__in' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/stock/in'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/stock/out",
                    "name": "out",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__stock__out' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/stock/out'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/stock/list",
                    "name": "list",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__stock__list' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/stock/list'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/stock/warehouse",
                    "name": "warehouse",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__stock__warehouse' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/stock/warehouse'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "path": "/project",
                "name": "project",
                "icon": "table",
                "routes": [
                  {
                    "path": "/project/apply",
                    "name": "apply",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__apply' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/project/apply'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/project/apply/create",
                    "name": "create",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__apply__components__create' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/project/apply/components/create'), loading: LoadingComponent}),
                    "menu": false,
                    "exact": true
                  },
                  {
                    "path": "/project/apply/update",
                    "name": "update",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__apply__components__update' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/project/apply/components/update'), loading: LoadingComponent}),
                    "menu": false,
                    "exact": true
                  },
                  {
                    "path": "/project/plan/create",
                    "name": "create",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__plan__components__create' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/project/plan/components/create'), loading: LoadingComponent}),
                    "menu": false,
                    "exact": true
                  },
                  {
                    "path": "/project/plan",
                    "name": "plan",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__plan' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/project/plan'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/project/plan/node",
                    "name": "plan.node",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__plan__components__node' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/project/plan/components/node'), loading: LoadingComponent}),
                    "menu": false,
                    "exact": true
                  },
                  {
                    "path": "/project/team",
                    "name": "team",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__team' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/project/team'), loading: LoadingComponent}),
                    "menu": false,
                    "exact": true
                  },
                  {
                    "path": "/project/plan/reimburse",
                    "name": "team",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__plan__components__reimburse' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/project/plan/components/reimburse'), loading: LoadingComponent}),
                    "menu": false,
                    "exact": true
                  },
                  {
                    "path": "/project/plan/reimburse_audit_history",
                    "name": "team",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__project__plan__components__reimburse_audit_history' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/project/plan/components/reimburse_audit_history'), loading: LoadingComponent}),
                    "menu": false,
                    "exact": true
                  }
                ]
              },
              {
                "path": "/construction",
                "name": "construction",
                "icon": "table",
                "routes": [
                  {
                    "path": "/construction/eng_staff_type",
                    "name": "eng_staff_type",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__construction__eng_staff_type' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/construction/eng_staff_type'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/construction/eng_staff",
                    "name": "eng_staff",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__construction__eng_staff' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/construction/eng_staff'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "path": "/info_base",
                "name": "info_base",
                "icon": "table",
                "routes": [
                  {
                    "path": "/info_base/supplier",
                    "name": "supplier",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__info_base__supplier' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/info_base/supplier'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/info_base/customer",
                    "name": "customer",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__info_base__customer' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/info_base/customer'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/info_base/third_party_team",
                    "name": "third_party_team",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__info_base__third_party_team' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/info_base/third_party_team'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/info_base/temp_worker",
                    "name": "temp_worker",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__info_base__temp_worker' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/info_base/temp_worker'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "name": "attendance",
                "icon": "table",
                "path": "/attendance",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__attendance' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/attendance'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "elec_info",
                "icon": "table",
                "path": "/elec_info",
                "routes": [
                  {
                    "path": "/elec_info/third_project",
                    "name": "third_project",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__elec_info__third_project' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/elec_info/third_project'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "path": "/elec_info/contract_template",
                    "name": "contract_template",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__elec_info__contract_template' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/elec_info/contract_template'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "name": "report",
                "icon": "table",
                "path": "/report",
                "routes": [
                  {
                    "path": "/report/template",
                    "name": "template",
                    "icon": "table",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__report__template' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/report/template'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "name": "list.table-list",
                "icon": "table",
                "path": "/list",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TableList' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/TableList'), loading: LoadingComponent}),
                "authority": [
                  "admin"
                ],
                "exact": true
              },
              {
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/404'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/wangyu/Repository/zyoa/front-demo/src/pages/404'), loading: LoadingComponent}),
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
