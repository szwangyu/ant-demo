// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from 'url';

// mock tableListDataSource
const genList = (current, pageSize) => {
  const tableListDataSource = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i + 1;
    tableListDataSource.push({
      key: index,
      name: `施工人员${index}`,
      sex: '男',
      age: '22',
      telphone: '13832323232',
      type: `类型 ${index}`,
      status: Math.floor(Math.random() * 9) % 2,
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
  const { method, name, sex, age, telphone, status, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      break;

    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        debugger;
        const mewEngStaff = {
          key: tableListDataSource.length,
          name, sex, age, telphone, status
        };
        tableListDataSource.unshift(mewEngStaff);
        return res.json(mewEngStaff);
      })();

      return;

    case 'update':
      (() => {
        let mewEngStaff = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            mewEngStaff = { ...item, name, sex, age, telphone, status };
            return { ...item, name, sex, age, telphone, status };
          }

          return item;
        });
        return res.json(mewEngStaff);
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
  'GET /api/construction/eng_staff': get,
  'POST /api/construction/eng_staff': post,
};
