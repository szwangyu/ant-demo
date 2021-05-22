// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from 'url';

// mock tableListDataSource
const genList = (current, pageSize) => {
  const tableListDataSource = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i + 1;
    tableListDataSource.push({
      key: index,
      code: `BX-000${index}`,
      name: `与工程管理部门商务支出`,
      amount: '200000',
      remark: '金额超限',
      auditDate: '2021-05-01',
      auditor: '张科长',
      result: '不通过',
    });
  }
  return tableListDataSource;
};

let tableListDataSource = genList(1, 9);

function get(req, res, u) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query;
  let dataSource = [...tableListDataSource].slice((current - 1) * pageSize, current * pageSize);
  const sorter = JSON.parse(params.sorter);

  if (sorter) {
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }

          return;
        }

        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }

  if (params.filter) {
    const filter = JSON.parse(params.filter);

    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }

          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }

          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
  }

  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };
  return res.json(result);
}

function post(req, res, u, b) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, partyA, detail, startDate, endDate, projectCostEsitmation, bussinessCostEsitmation, transcationCostEsitmation, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      break;

    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newSupplier = {
          key: tableListDataSource.length,
          name, partyA, detail, startDate, endDate, projectCostEsitmation, bussinessCostEsitmation, transcationCostEsitmation
        };
        tableListDataSource.unshift(newSupplier);
        return res.json(newSupplier);
      })();

      return;

    case 'update':
      (() => {
        let newSupplier = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newSupplier = { ...item, name, partyA, detail, startDate, endDate, projectCostEsitmation, bussinessCostEsitmation, transcationCostEsitmation };
            return { ...item, name, partyA, detail, startDate, endDate, projectCostEsitmation, bussinessCostEsitmation, transcationCostEsitmation };
          }

          return item;
        });
        return res.json(newSupplier);
      })();

      return;

    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };
  res.json(result);
}

export default {
  'GET /api/project/reimburse_audit_history': get,
  'POST /api/project/reimburse_audit_history': post,
};
