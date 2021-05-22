import request from '@/utils/request';

export async function query(params) {
  return request('/api/project/plan_node', {
    params,
  });
}

export async function remove(key) {
  return request('/api/project/plan_node', {
    method: 'POST',
    data: { key, method: 'delete' },
  });
}

export async function add(params) {
  return request('/api/project/plan_node', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}

export async function update(params) {
  return request('/api/project/plan_node', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
